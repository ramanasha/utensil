package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.github.scribejava.core.model.OAuth2AccessToken;

public class SplitwiseTokenMapper implements ResultSetMapper<OAuth2AccessToken> {

    public OAuth2AccessToken map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new OAuth2AccessToken(r.getString("splitwise_token"));
    }
}
