describe ('Customer', function() {
  it("creates information for a customer", function() {
  var customer1 = new Customer("Plato", "(503)-111-1111", "39 SE 21st Avenue");
  expect(customer1.name).to.equal("Plato");
  expect(customer1.phoneNumber).to.equal("(503)-111-1111");
  expect(customer1.address).to.equal("39 SE 21st Avenue");
  });
});

describe ('Pizza', function() {
  it("creates information for a pizza order", function() {
  var pizzaOrder = new Pizza(3, "large", "pepperoni");
  expect(pizzaOrder.quantity).to.equal(3);
  expect(pizzaOrder.size).to.equal("large");
  expect(pizzaOrder.toppings).to.equal("pepperoni");
  });

  it("computes cost of a small cheese pizza", function() {
    var pizzaOrder = new Pizza(1, "small", []);
    expect(pizzaOrder.cost()).to.equal(14);
  });

  it("computes the cost of a small pepperoni pizza", function() {
    var pizzaOrder = new Pizza(1, "small", ["pepperoni"]);
    expect(pizzaOrder.cost()).to.equal(16);
  });

  it("computes the cost of a pizza with multiple toppings", function() {
    var pizzaOrder = new Pizza(1, "large", ['sausage', 'mushroom', 'onion'])
    expect(pizzaOrder.total()).to.equal(30);
  });

  it("applies a 10% discount if you order multiple pizzas of the same size and toppings", function() {
    var pizzaOrder = new Pizza(2, "large", ['sausage', 'mushroom', 'onion'])
    expect(pizzaOrder.total()).to.equal(54);
  });
});
