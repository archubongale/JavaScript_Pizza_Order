function Customer(name, phoneNumber, address) {
  this.name = name;
  this.phoneNumber = phoneNumber;
  this.address = address;
}

function Pizza(quantity, size, toppings) {
  this.quantity = quantity;
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.cost = function() {
  var sizeCost = 0;
  var toppingCost = 0;
  var cost = 0;
  if (this.size === "small") {
    sizeCost = 14;
    toppingCost = (this.toppings.length) * 2;
  } if (this.size === "medium") {
    sizeCost = 17;
    toppingCost = (this.toppings.length) * (2.5);
  } if (this.size === "large") {
    sizeCost = 21;
    toppingCost = (this.toppings.length) * (3);
  } if (this.size === "extraLarge") {
    sizeCost = 26;
    toppingCost = (this.toppings.length) * (3.50);
  }
  cost = sizeCost + toppingCost;
  return cost;
}

Pizza.prototype.total = function() {
  var finalCost;
  if (this.quantity > 1) {
    finalCost = this.cost() * this.quantity * (.9);
  } else {
    finalCost = this.cost();
  }
    return finalCost;
}

Pizza.prototype.getSize = function() {
  var radio = $("input[type='radio']")
  for (index=0; index < radio.length; ++index) {
    if(radio[index].checked) {
      var size = radio[index].value;
    }
  }
  return size;
}

Pizza.prototype.getToppings = function() {
  var toppings = $("input[type='checkbox']");
  var all = _.map(toppings, function(topping){
    var $topping = $(topping);
    if($topping.is(':checked')){
      return $topping.attr('value');
    }
  });
  return _.compact(all);
}

$(document).ready(function() {

  $("form#new-order").submit(function(event) {
    event.preventDefault();

    var name = $('input#new-name').val();
    var phone = $('input#phone-number').val();
    var address = $('input#address').val();

    var newCustomer = new Customer(name, phone, address);

    var pizzaNumber = $('input#pizza-quantity').val();
    var newPizza = new Pizza(pizzaNumber);
    newPizza.size = newPizza.getSize();
    newPizza.toppings = newPizza.getToppings();

    var orderTemplate = _.template("<span class='order'><h4><%= name %></h4>Phone Number:  <%= phone %>" +
                                   "<br>Address:  <%= address %>" +
                                   "<br>Number of pizzas:  <%= quantity %>" +
                                   "<br>Pizza size:  <%= size %>" +
                                   "<br>Pizza toppings:  <%= toppings %>" +
                                   "<br>Total cost:  <%= total %></span><br><br>");
    var filledTemplate = orderTemplate({'name': newCustomer.name,
                                        'phone': newCustomer.phoneNumber,
                                        'address': newCustomer.address,
                                        'quantity': newPizza.quantity,
                                        'size': newPizza.size,
                                        'toppings': newPizza.toppings.join(", "),
                                        'total': newPizza.total()});
  $("#orders").append(filledTemplate);

  });
});
