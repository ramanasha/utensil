package utensil;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.oauth.OAuthCredentialAuthFilter;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import utensil.UtensilConfiguration;
import utensil.api.User;
import utensil.auth.OAuthAuthenticator;
import utensil.jdbi.AccessTokenDAO;
import utensil.jdbi.GroupDAO;
import utensil.jdbi.ItemDAO;
import utensil.jdbi.MenuSectionDAO;
import utensil.jdbi.OrderDAO;
import utensil.jdbi.OrderItemDAO;
import utensil.jdbi.RestaurantDAO;
import utensil.jdbi.SplitwiseTokenDAO;
import utensil.jdbi.SplitwiseUserDAO;
import utensil.jdbi.UserDAO;
import utensil.jdbi.VoteDAO;
import utensil.payment.PaymentManager;
import utensil.resources.GroupResource;
import utensil.resources.OrderResource;
import utensil.resources.PaymentResource;
import utensil.resources.RestaurantResource;
import utensil.resources.UserResource;
import io.dropwizard.jdbi.DBIFactory;

import org.skife.jdbi.v2.DBI;

public class UtensilApplication extends Application<UtensilConfiguration> {

    @Override
    public String getName() {
        return "Utensil Server";
    }

    @Override
    public void run(UtensilConfiguration config, Environment environment)
            throws ClassNotFoundException {
        final DBIFactory factory = new DBIFactory();
        final DBI jdbi = factory.build(environment, config.getDataSourceFactory(), "postgresql");
        final RestaurantDAO restaurantDAO = jdbi.onDemand(RestaurantDAO.class);
        final GroupDAO groupDAO = jdbi.onDemand(GroupDAO.class);
        final MenuSectionDAO menuSectionDAO = jdbi.onDemand(MenuSectionDAO.class);
        final ItemDAO itemDAO = jdbi.onDemand(ItemDAO.class);
        final OrderDAO orderDAO = jdbi.onDemand(OrderDAO.class);
        final OrderItemDAO orderItemDAO = jdbi.onDemand(OrderItemDAO.class);
        final VoteDAO voteDAO = jdbi.onDemand(VoteDAO.class);
        final AccessTokenDAO accessTokenDAO = jdbi.onDemand(AccessTokenDAO.class);
        final UserDAO userDAO = jdbi.onDemand(UserDAO.class);
        final SplitwiseTokenDAO splitwiseTokenDAO = jdbi.onDemand(SplitwiseTokenDAO.class);
        final SplitwiseUserDAO splitwiseUserDAO = jdbi.onDemand(SplitwiseUserDAO.class);

        final PaymentManager paymentManager = new PaymentManager(
                config.getSplitwiseConsumerKey(),
                config.getSplitwiseConsumerSecret(),
                config.getSplitwiseCallbackUri(),
                config.getSplitwiseGroupId(),
                config.getLocalMealTax(),
                splitwiseTokenDAO, splitwiseUserDAO, itemDAO);

        environment.jersey().register(new RestaurantResource(restaurantDAO, menuSectionDAO, itemDAO));
        environment.jersey().register(new GroupResource(
                groupDAO, voteDAO, orderDAO, orderItemDAO,
                paymentManager));
        environment.jersey().register(new OrderResource(orderDAO, orderItemDAO));
        environment.jersey().register(new UserResource(userDAO, accessTokenDAO));
        environment.jersey().register(new PaymentResource(paymentManager));

        environment.jersey().register(new AuthDynamicFeature(
                new OAuthCredentialAuthFilter.Builder<User>()
                    .setAuthenticator(new OAuthAuthenticator(accessTokenDAO, userDAO))
                    .setPrefix("Bearer")
                    .buildAuthFilter()));
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));
    }

    @Override
    public void initialize(Bootstrap<UtensilConfiguration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/build/", "/static/"));
        bootstrap.setConfigurationSourceProvider(
                new SubstitutingSourceProvider(
                        bootstrap.getConfigurationSourceProvider(),
                        new EnvironmentVariableSubstitutor(false)
                )
        );
    }

    public static void main(String[] args) throws Exception {
        new UtensilApplication().run(args);
    }
}
