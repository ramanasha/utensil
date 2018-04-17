export default ({ pizza }) => {
  if (pizza) {
    const { size } = pizza;
    return `${size.charAt(0).toUpperCase()}${size.slice(1)} ` +
         `with ${pizza.toppings.size} toppings`;
  }
  return '';
};
