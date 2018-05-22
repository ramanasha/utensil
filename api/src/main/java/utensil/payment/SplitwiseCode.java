package utensil.payment;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SplitwiseCode {

    @NotNull
    @JsonProperty
    private String code;

    @NotNull
    @JsonProperty
    private long userId;

    public SplitwiseCode() { }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
