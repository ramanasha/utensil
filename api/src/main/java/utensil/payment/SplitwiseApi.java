package utensil.payment;

import com.github.scribejava.core.builder.api.DefaultApi20;

public class SplitwiseApi extends DefaultApi20 {
    
    protected SplitwiseApi() { }
    
    private static class InstanceHolder {
        private static final SplitwiseApi INSTANCE = new SplitwiseApi();
    }
    
    public static SplitwiseApi instance() {
        return InstanceHolder.INSTANCE;
    }
    
    @Override
    public String getAccessTokenEndpoint() {
        return "https://secure.splitwise.com/oauth/token";
    }
    
    @Override
    protected String getAuthorizationBaseUrl() {
        return "https://secure.splitwise.com/oauth/authorize";
    }
}
