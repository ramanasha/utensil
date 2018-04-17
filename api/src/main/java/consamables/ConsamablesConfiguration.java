package consamables;

import io.dropwizard.Configuration;
import io.dropwizard.client.JerseyClientConfiguration;
import io.dropwizard.db.DataSourceFactory;

import java.math.BigDecimal;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ConsamablesConfiguration extends Configuration {
    @Valid
    @NotNull
    private DataSourceFactory database = new DataSourceFactory();

    @Valid
    @NotNull
    private JerseyClientConfiguration jerseyClient = new JerseyClientConfiguration();
    
    @Valid
    @NotNull
    @JsonProperty
    private String splitwiseConsumerKey;
    
    @Valid
    @NotNull
    @JsonProperty
    private String splitwiseConsumerSecret;

    @Valid
    @NotNull
    @JsonProperty
    private String splitwiseCallbackUri;

    @Valid
    @NotNull
    @JsonProperty
    private long splitwiseGroupId;
    
    @Valid
    @NotNull
    @JsonProperty
    private BigDecimal localMealTax;

    @JsonProperty("database")
    public void setDataSourceFactory(DataSourceFactory factory) {
        this.database = factory;
    }

    @JsonProperty("database")
    public DataSourceFactory getDataSourceFactory() {
        return database;
    }

    @JsonProperty("jerseyClient")
    public JerseyClientConfiguration getJerseyClientConfiguration() {
        return jerseyClient;
    }
    
    @JsonProperty("jerseyClient")
    public void setJerseyClientConfiguration(JerseyClientConfiguration jerseyClient) {
        this.jerseyClient = jerseyClient;
    }

    public String getSplitwiseConsumerKey() {
        return splitwiseConsumerKey;
    }

    public void setSplitwiseConsumerKey(String splitwiseConsumerKey) {
        this.splitwiseConsumerKey = splitwiseConsumerKey;
    }

    public String getSplitwiseConsumerSecret() {
        return splitwiseConsumerSecret;
    }

    public void setSplitwiseConsumerSecret(String splitwiseConsumerSecret) {
        this.splitwiseConsumerSecret = splitwiseConsumerSecret;
    }

    public String getSplitwiseCallbackUri() {
        return splitwiseCallbackUri;
    }

    public void setSplitwiseCallbackUri(String splitwiseCallbackUri) {
        this.splitwiseCallbackUri = splitwiseCallbackUri;
    }

    public long getSplitwiseGroupId() {
        return splitwiseGroupId;
    }

    public void setSplitwiseGroupId(String splitwiseGroupId) {
        this.splitwiseGroupId = Long.parseLong(splitwiseGroupId);
    }

    public BigDecimal getLocalMealTax() {
        return localMealTax;
    }

    public void setLocalMealTax(BigDecimal localMealTax) {
        this.localMealTax = localMealTax;
    }
}
