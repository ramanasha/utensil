package utensil.jdbi;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import utensil.api.MenuSection;
import utensil.jdbi.mappers.MenuSectionMapper;

@RegisterMapper(MenuSectionMapper.class)
public interface MenuSectionDAO {
    @SqlQuery("SELECT * FROM menu_section WHERE restaurant_id = :restaurantId")
    List<MenuSection> getMenuSections(@Bind("restaurantId") long restaurantId);
}
