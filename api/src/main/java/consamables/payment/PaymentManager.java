package consamables.payment;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;

import consamables.api.OrderItem;
import consamables.jdbi.ItemDAO;
import consamables.jdbi.SplitwiseTokenDAO;
import consamables.jdbi.SplitwiseUserDAO;

public class PaymentManager {
    private static final String BASE_URL = "https://secure.splitwise.com/api/v3.0/";
    private static final String BASE_GROUP_URL = "https://secure.splitwise.com/groups/";
    private static final String GET_USER = BASE_URL + "get_current_user";
    private static final String ADD_USER = BASE_URL + "add_user_to_group";
    private static final String CREATE_EXPENSE = BASE_URL + "create_expense";

    private OAuth20Service service;
    private long splitwiseGroupId;
    private BigDecimal localMealTax;
    private SplitwiseTokenDAO tokenDAO;
    private SplitwiseUserDAO userDAO;
    private ItemDAO itemDAO;
    private ObjectMapper objectMapper;

    public PaymentManager(String consumerKey, String consumerSecret,
                           String splitwiseCallbackUri, long splitwiseGroupId,
                           BigDecimal localMealTax,
                           SplitwiseTokenDAO tokenDAO, SplitwiseUserDAO userDAO,
                           ItemDAO itemDAO) {
        this.service = new ServiceBuilder()
                .apiKey(consumerKey)
                .apiSecret(consumerSecret)
                .callback(splitwiseCallbackUri)
                .responseType("code")
                .build(SplitwiseApi.instance());
        this.splitwiseGroupId = splitwiseGroupId;
        this.localMealTax = localMealTax;
        this.tokenDAO = tokenDAO;
        this.userDAO = userDAO;
        this.itemDAO = itemDAO;
        this.objectMapper = new ObjectMapper();
    }

    public String getAuthorizationUrl() {
        return service.getAuthorizationUrl();
    }
    
    public String getGroupUrl() {
    	return BASE_GROUP_URL + Long.toString(splitwiseGroupId);
    }

    public void authenticateUser(SplitwiseCode code) throws IOException {
        final OAuth2AccessToken accessToken = service.getAccessToken(code.getCode());
        tokenDAO.setToken(accessToken, code.getUserId());

        SplitwiseUser splitwiseUser = getSplitwiseUserInfo(code.getUserId());
        userDAO.updateUserInfo(splitwiseUser, code.getUserId());
        addUserToGroup(code.getUserId(), splitwiseGroupId);
    }

    public SplitwiseUser getSplitwiseUserInfo(long userId) throws JsonProcessingException, IOException {
        final OAuth2AccessToken accessToken = tokenDAO.getToken(userId);
        final OAuthRequest request = createGetRequest(GET_USER, accessToken);
        final Response response = request.send();

        JsonNode userData = objectMapper.readTree(response.getBody()).get("user");
        return objectMapper.treeToValue(userData, SplitwiseUser.class);
    }

    public void addUserToGroup(long userId, long groupId) throws JsonProcessingException, IOException {
        Long permittedUserId = userDAO.getUserIdInGroup(groupId);
        if (permittedUserId == null) {
            // If no one's in the group in the database, this must be the first person.
            permittedUserId = userId;
        }
        final OAuth2AccessToken accessToken = tokenDAO.getToken(permittedUserId);
        final SplitwiseUser user = userDAO.getUserInfo(userId);
        final AddUserBody body = new AddUserBody(user, groupId);
        final OAuthRequest request = createPostRequest(ADD_USER, body, accessToken);
        Response response = request.send();
        if (response.isSuccessful()) {
            userDAO.setGroupForUser(groupId, userId);
        }
    }

    public void createCharge(long payerId, long payeeId, BigDecimal amount, String description) throws JsonProcessingException {
        long splitwisePayerId = userDAO.getSplitwiseUserId(payerId);
        long splitwisePayeeId = userDAO.getSplitwiseUserId(payeeId);
        final OAuth2AccessToken accessToken = tokenDAO.getToken(payerId);
        final CreateChargeBody body = new CreateChargeBody(
                splitwisePayerId, splitwisePayeeId, splitwiseGroupId,
                amount, description);
        final OAuthRequest request = createPostRequest(CREATE_EXPENSE, body, accessToken);
        request.send();
    }

    public BigDecimal calculateOrderCost(List<OrderItem> orderItems, BigDecimal overhead) {
        BigDecimal total = new BigDecimal("0");
        for (OrderItem orderItem : orderItems) {
            BigDecimal price = itemDAO.getItemPrice(orderItem.getItemId());
            total = total.add(price.multiply(new BigDecimal(orderItem.getQuantity())));
        }
        BigDecimal newTotal = total.multiply(localMealTax.add(BigDecimal.ONE))
                .multiply(overhead.add(BigDecimal.ONE));
        BigDecimal roundedTotal = newTotal.multiply(new BigDecimal("2"))
                .setScale(0, RoundingMode.CEILING)
                .multiply(new BigDecimal("0.5"));
        return roundedTotal;
    }

    private OAuthRequest createGetRequest(String url, OAuth2AccessToken accessToken) {
        final OAuthRequest request = new OAuthRequest(Verb.GET, url, service);
        service.signRequest(accessToken, request);
        return request;
    }

    private OAuthRequest createPostRequest(String url, Object body, OAuth2AccessToken accessToken) throws JsonProcessingException {
        final OAuthRequest request = new OAuthRequest(Verb.POST, url, service);
        request.addHeader("Content-Type", "application/json;charset=UTF-8");
        request.addPayload(objectMapper.writeValueAsString(body));
        service.signRequest(accessToken, request);
        return request;
    }
}
