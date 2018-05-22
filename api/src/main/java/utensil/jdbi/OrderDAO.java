package utensil.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import utensil.api.Order;
import utensil.jdbi.binders.BindOrder;
import utensil.jdbi.mappers.OrderMapper;

@RegisterMapper(OrderMapper.class)
public interface OrderDAO {        
    @SqlQuery("SELECT * FROM \"order\"")
    List<Order> getAll();

    @SqlQuery("SELECT * FROM \"order\" WHERE group_id = :groupId")
    List<Order> getOrdersForGroup(@Bind("groupId") long groupId);
    
    @SqlQuery("SELECT \"order\".* FROM \"order\" JOIN \"group\" USING (group_id) " +
              "WHERE user_id = :userId AND phase != 'complete'")
    List<Order> getOrdersForUser(@Bind("userId") long userId);
    
    @SqlQuery("SELECT \"order\".* FROM \"order\" JOIN \"group\" USING (group_id) " +
              "WHERE user_id = :userId AND phase != 'complete' AND group_id = :groupId")
    List<Order> getOrdersForUserInGroup(@Bind("userId") long userId, @Bind("groupId") long groupId);

    @SqlQuery("SELECT * FROM \"order\" WHERE order_id = :orderId")
    Order getOrder(@Bind("orderId") long orderId);

    @SqlQuery("SELECT count(*) FROM \"order\" WHERE group_id = :groupId")
    int countOrdersInGroup(@Bind("groupId") long groupId);

    @SqlUpdate("INSERT INTO \"order\" " +
               "(group_id, user_id, data) " +
               "VALUES " +
               "(:groupId, :userId, CAST(:data AS json))")
    @GetGeneratedKeys
    long addOrder(@BindOrder Order order);

    @SqlUpdate("DELETE FROM \"order\" WHERE order_id = :orderId")
    void deleteOrder(@Bind("orderId") long orderId);
}
