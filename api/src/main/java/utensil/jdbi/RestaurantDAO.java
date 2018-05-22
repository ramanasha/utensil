package utensil.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import utensil.api.Restaurant;
import utensil.jdbi.binders.BindRestaurant;
import utensil.jdbi.mappers.RestaurantMapper;

@RegisterMapper(RestaurantMapper.class)
public interface RestaurantDAO {
    @SqlQuery("SELECT * FROM restaurant")
    List<Restaurant> getAll();

    @SqlQuery("SELECT * FROM restaurant WHERE restaurant_id = :restaurantId")
    Restaurant getRestaurant(@Bind("restaurantId") long restaurantId);

    @SqlUpdate("INSERT INTO restaurant " +
               "(name, location, hours, url, has_delivery, data) " +
               "VALUES " +
               "(:name, CAST(:location AS json), CAST(:hours AS json), :url, :hasDelivery, CAST(:data AS json))")
    @GetGeneratedKeys
    long addRestaurant(@BindRestaurant Restaurant restaurant);
}
