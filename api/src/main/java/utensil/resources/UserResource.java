package utensil.resources;

import java.util.regex.Pattern;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.dropwizard.auth.Auth;
import utensil.api.User;
import utensil.auth.AccessToken;
import utensil.auth.LoginCredentials;
import utensil.auth.LoginManager;
import utensil.auth.NewCredentials;
import utensil.jdbi.AccessTokenDAO;
import utensil.jdbi.UserDAO;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    private LoginManager loginManager;
    private UserDAO dao;
    
    private static String usernameRegex = "^[\\w-\\.]+@([a-zA-Z_]+?\\.)+[a-zA-Z]{2,3}$";

    public UserResource(UserDAO userDAO, AccessTokenDAO accessTokenDAO) {
        this.loginManager = new LoginManager(userDAO, accessTokenDAO);
        this.dao = userDAO;
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public AccessToken login(@Valid LoginCredentials credentials) {
        AccessToken token = loginManager.verifyCredentials(credentials);
        if (token == null) {
            throw new NotAuthorizedException("Wrong username or password.", Response.status(401).build());
        } else {
            return token;
        }
    }

    @Path("/new")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public AccessToken createUser(@Valid LoginCredentials credentials) {
        if (!Pattern.matches(usernameRegex, credentials.getUsername())) {
            throw new WebApplicationException("Invalid username.", Response.status(400).build());
        }
        AccessToken token = loginManager.registerNewUser(credentials);
        if (token == null) {
            throw new WebApplicationException("That username is already taken.", Response.status(409).build());
        } else {
            return token;
        }
    }

    @Path("/get-info")
    @GET
    public User getInfo(@Auth User user) {
        return user;
    }
    
    @Path("/change-username")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public User changeUsername(@Auth User user, @Valid NewCredentials credentials) {
    	if (!Pattern.matches(usernameRegex, credentials.getUsername())) {
    		throw new WebApplicationException("Invalid username.", Response.status(400).build());
    	}
    	return loginManager.changeUsername(user.getEmail(), credentials.getUsername());
    }
    
    @Path("/change-password")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public User changePassword(@Auth User user, @Valid NewCredentials credentials) {
    	credentials.setUsername(user.getEmail());
    	User sameUser = loginManager.changePassword(credentials);
    	if (sameUser == null) {
    		throw new WebApplicationException("Existing password does not match.", Response.status(400).build());
    	}
    	return user;
    }

    @PermitAll
    @Path("/{id}/name")
    @GET
    public User getName(@PathParam("id") String id) {
        return dao.getUser(Long.parseLong(id));
    }
}
