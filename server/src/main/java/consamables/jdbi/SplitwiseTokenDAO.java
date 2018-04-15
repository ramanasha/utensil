package consamables.jdbi;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.github.scribejava.core.model.OAuth2AccessToken;

import consamables.jdbi.mappers.SplitwiseTokenMapper;

@RegisterMapper(SplitwiseTokenMapper.class)
public interface SplitwiseTokenDAO {
    @SqlQuery("SELECT splitwise_token FROM \"user\" " +
              "WHERE user_id = :userId")
    OAuth2AccessToken getToken(@Bind("userId") long userId);
    
    @SqlUpdate("UPDATE \"user\" SET splitwise_token = " +
               ":accessToken WHERE user_id = :userId")
    void setToken(@BindBean OAuth2AccessToken token, @Bind("userId") long userId);
}
