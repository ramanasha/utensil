package utensil.jdbi;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import utensil.api.User;
import utensil.jdbi.mappers.UserMapper;

@RegisterMapper(UserMapper.class)
public interface UserDAO {
    @SqlQuery("SELECT user_id, email FROM \"user\"")
    List<User> getAll();

    @SqlQuery("SELECT EXISTS (SELECT 1 FROM \"user\" WHERE email = :username)")
    boolean doesUserExist(@Bind("username") String username);

    @SqlQuery("SELECT user_id, email, (SELECT splitwise_token IS NOT NULL) AS auth " +
              "FROM \"user\" WHERE user_id = :userId")
    User getUser(@Bind("userId") long userId);

    @SqlQuery("SELECT user_id, email, (SELECT splitwise_token IS NOT NULL) AS auth " +
              "FROM \"user\" WHERE email = :username")
    User getUser(@Bind("username") String username);
    
    @SqlQuery("SELECT (splitwise_token IS NOT NULL) FROM \"user\" WHERE user_id = :userId")
    boolean isSplitwiseAuthenticated(@Bind("userId") long userId);

    @SqlQuery("SELECT password_hash FROM \"user\" WHERE email = :username")
    byte[] getPasswordHash(@Bind("username") String username);

    @SqlQuery("SELECT password_salt FROM \"user\" WHERE email = :username")
    byte[] getPasswordSalt(@Bind("username") String username);

    @SqlQuery("INSERT INTO \"user\" " +
              "(email, password_hash, password_salt) " +
              "VALUES " +
              "(:username, :hash, :salt) " +
              "RETURNING user_id, email, FALSE AS auth")
    User addUser(@Bind("username") String username, @Bind("hash") byte[] hash, @Bind("salt") byte[] salt);
    
    @SqlQuery("UPDATE \"user\" SET email = :username " +
    		  "WHERE email = :oldUsername " +
    		  "RETURNING user_id, email, (splitwise_token IS NOT NULL) AS auth")
    User changeUsername(@Bind("oldUsername") String oldUsername, @Bind("username") String username);
    
    @SqlQuery("UPDATE \"user\" SET " +
              "(password_hash, password_salt) = (:hash, :salt) " +
    		  "WHERE email = :username " +
              "RETURNING user_id, email, (splitwise_token IS NOT NULL) AS auth")
    User changePassword(@Bind("username") String username, @Bind("hash") byte[] hash, @Bind("salt") byte[] salt);
}
