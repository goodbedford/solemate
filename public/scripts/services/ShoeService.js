app.factory('ShoeService', [function() {
  var shoes = [{
      id: 1,
      name: 'Delsie Stella',
      brand: 'Clarks',
      price: 139.95,
      color: 'black',
      shoeUrl: 'http://s2.shoes.com/images/br013/womens-clarks-delsie-stella-black-leather-434645_200_45.jpg',
      counter: 0
    }, {
      id: 2,
      name: 'Edell',
      brand: 'Bandolino',
      price: 58.95,
      color: 'black',
      shoeUrl: 'http://s2.shoes.com/images/br291/womens-bandolino-edell-black-480015_200_45.jpg',
      counter: 0
    }, {
      id: 3,
      name: 'Haven',
      brand: 'Aerosoles',
      price: 57.99,
      color: 'brown',
      shoeUrl: 'http://s1.shoes.com/images/br023/womens-aerosoles-haven-taupe-combo-485752_120_45.jpg',
      counter: 0
    }, {
      id: 4,
      name: 'Jessica Bohemia Slide',
      brand: 'Frye',
      price: 183.99,
      color: 'brown',
      shoeUrl: 'http://s1.shoes.com/images/br065/womens-frye-jessica-bohemian-slide-brown-leather-454794_120_45.jpg',
      counter: 0
    }, {
      id: 5,
      name: 'Gelata Fresca',
      brand: 'Clarks',
      price: 139.95,
      color: 'brown',
      shoeUrl: 'http://s2.shoes.com/images/br013/womens-clarks-gelata-fresca-dark-tan-leather-434685_120_45.jpg',
      counter: 0
    }, {
      id: 6,
      name: 'Estee',
      brand: 'Trotters',
      price: 129.95,
      color: 'purple',
      shoeUrl: 'http://s2.shoes.com/images/br072/womens-trotters-estee-purple-suede-494139_120_45.jpg',
      counter: 0
    }, {
      id: 7,
      name: 'Simone',
      brand: 'Wanted',
      price: 39.95,
      color: 'red',
      shoeUrl: 'http://s1.shoes.com/images/br574/womens-wanted-simone-coral-490199_120_45.jpg',
      counter: 0
    }
  ]
  var factory = {}
  factory.getShoes = function() {
    return shoes;
  }
  factory.getShoeById = function(id) {
    var foundShoe = null;
    shoes.forEach( function(shoe){
      if (shoe.id == id) {
        foundShoe = shoe;
      }
    });
    return foundShoe;
  }
  
  return factory;
}]);



