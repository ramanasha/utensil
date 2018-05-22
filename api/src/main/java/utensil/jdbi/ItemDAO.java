package utensil.jdbi;

import java.math.BigDecimal;
import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import utensil.api.Item;
import utensil.jdbi.binders.BindItem;
import utensil.jdbi.mappers.ItemMapper;

@RegisterMapper(ItemMapper.class)
public interface ItemDAO {
    @SqlQuery("SELECT * FROM item")
    List<Item> getAll();

    @SqlQuery("SELECT * FROM item WHERE menu_section_id = :menuSectionId")
    List<Item> getItemsByMenuSection(@Bind("menuSectionId") long menuSectionId);

    @SqlQuery("SELECT * FROM item WHERE item_id = :itemId")
    Item getItem(@Bind("itemId") long itemId);

    @SqlQuery("SELECT price FROM item WHERE item_id = :itemId")
    BigDecimal getItemPrice(@Bind("itemId") long itemId);

    @SqlUpdate("INSERT INTO item " +
               "(menu_section_id, name, description, price, data) " +
               "VALUES " +
               "(:menuSectionId, :name, :description, :price, CAST(:data AS json))")
    void addItem(@BindItem Item item);

    @SqlUpdate("DELETE FROM item WHERE item_id = :itemId")
    void deleteItem(@Bind("itemId") long itemId);
}
