package utensil.resources;

import java.io.IOException;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.dropwizard.auth.Auth;
import utensil.api.User;
import utensil.payment.PaymentManager;
import utensil.payment.SplitwiseCode;

@Path("/payment")
@Produces(MediaType.APPLICATION_JSON)
public class PaymentResource {
    private PaymentManager paymentManager;

    public PaymentResource(PaymentManager paymentManager) {
        this.paymentManager = paymentManager;
    }

    @Path("/authorize-url")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getAuthorizationUrl() {
        return paymentManager.getAuthorizationUrl();
    }
    
    @Path("/group-url")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getGroupUrl() {
    	return paymentManager.getGroupUrl();
    }
    
    @Path("/authenticate-user")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateSplitwiseUser(@Auth User user, @Valid SplitwiseCode code) throws IOException {
        if (!user.getUserId().equals(code.getUserId())) {
            throw new NotAuthorizedException("You don't have permission to do this.", Response.status(401).build());
        }
        paymentManager.authenticateUser(code);

        return Response.ok().build();
    }
}
