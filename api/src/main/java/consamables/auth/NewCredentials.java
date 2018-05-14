package consamables.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewCredentials {
    @JsonProperty
    private String username;

    @JsonProperty
    private String password;
    
    @JsonProperty
    private String oldPassword;

    public NewCredentials() { }
    
    public NewCredentials(String username) {
    	this.username = username;
    }

    public NewCredentials(String oldPassword, String password) {
        this.oldPassword = oldPassword;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
