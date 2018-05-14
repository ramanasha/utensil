INSERT INTO menu_section (menu_section_id, restaurant_id, name) VALUES
(16, 1, 'Bread');

SELECT pg_catalog.setval('menu_section_menu_section_id_seq', 17, true);

INSERT INTO item (item_id, menu_section_id, name, description, price, data) VALUES
(105, 13, 'Custom Medium Pizza', '12" pizza with up to 2 toppings.', 5.99, '{"pizza":{"delivery":true,"maxToppings":2,"halves":false}}'),
(106, 16, 'Stuffed Cheesy Bread', 'Oven-baked breadsticks, generously stuffed and covered with a blend of 100% real mozzarella and cheddar cheeses then seasoned with a touch of garlic.', 5.99, NULL),
(107, 16, 'Parmesan Bread Twists', 'Handmade from fresh buttery-tasting dough and baked to a golden brown. Crusty on the outside and soft on the inside. Drizzled with garlic and Parmesan cheese seasoning, and sprinkled with more Parmesan.', 5.99, NULL);

SELECT pg_catalog.setval('item_item_id_seq', 108, true);
