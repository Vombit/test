var TestArray = [];

var ShopImpl = (function () {
  function ShopImpl() {}

  ShopImpl.prototype.addNewProduct = function (product) {

    if(TestArray.find(item => item.id == product.id)) {
      return false
    } else {
      TestArray.push(product);
      return true
    }

  };

  ShopImpl.prototype.deleteProduct = function (id) {

    var delElem = TestArray.find(item => item.id == id);
    if(delElem) {
      var indexElem = TestArray.indexOf(delElem)
      TestArray.splice(indexElem, 1); 
      return true
    } else {
      return false
    }

  };

  ShopImpl.prototype.listProductsByName = function (searchString) {

    var re = new RegExp(searchString,"i");
    
    var NewArray =TestArray.filter(item => item = re.test(item.name))

    var dublNames = NewArray.map(e => e['name'])
                    .map((e, i, final) => final.indexOf(e) !== i && i)
                    .filter(obj=> NewArray[obj])
                    .map(e => NewArray[e]["name"]);

    var finaly = [];

    NewArray.forEach(items => {
      if(dublNames.includes(items.name)) {
        finaly.push(`${items.producer} - ${items.name}`);
    } else {
        finaly.push(`${items.name}`); 
    }
    });

    return finaly.slice(0, 10)

  };

  ShopImpl.prototype.listProductsByProducer = function (searchString) {
    var re = new RegExp(searchString,"i");
    
    var NewArray =TestArray.filter(item => item = re.test(item.producer))
    var sortArray = [];
    var finaly = []
    NewArray.forEach(items => {
                var prod = items.producer.replace(/[^\d]/g, '');
                sortArray.push({name:items.name, producer:items.producer.replace(/[^\d]/g, '')});
                sortArray.sort((a, b) => a.producer - b.producer);
    });
    sortArray.forEach(item => {
        finaly.push(`${item.name}`);
    });

    return finaly.slice(0, 10)

  };

  return ShopImpl;
}());

function test(shop) {
    assert(!shop.deleteProduct("1"));
    assert(shop.addNewProduct({ id: "1", name: "1", producer: "Lex" }));
    assert(!shop.addNewProduct({ id: "1", name: "any name because we check id only", producer: "any producer" }));
    assert(shop.deleteProduct("1"));
    assert(shop.addNewProduct({ id: "3", name: "Some Product3", producer: "Some Producer2" }));
    assert(shop.addNewProduct({ id: "4", name: "Some Product1", producer: "Some Producer3" }));
    assert(shop.addNewProduct({ id: "2", name: "Some Product2", producer: "Some Producer2" }));
    assert(shop.addNewProduct({ id: "1", name: "Some Product1", producer: "Some Producer1" }));
    assert(shop.addNewProduct({ id: "5", name: "Other Product5", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "6", name: "Other Product6", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "7", name: "Other Product7", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "8", name: "Other Product8", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "9", name: "Other Product9", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "10", name: "Other Product10", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "11", name: "Other Product11", producer: "Other Producer4" }));
    var byNames = shop.listProductsByName("Product");
    assert(byNames.length == 10);
    byNames = shop.listProductsByName("Some Product");
    assert(byNames.length == 4);
    assert(byNames.indexOf("Some Producer3 - Some Product1") >= 0);
    assert(byNames.indexOf("Some Product2") >= 0);
    assert(byNames.indexOf("Some Product3") >= 0);
    assert(byNames.indexOf("Some Product1") < 0);
    assert(byNames.indexOf("Some Producer1 - Some Product1") >= 0);
    var byProducer = shop.listProductsByProducer("Producer");
    assert(byProducer.length == 10);
    byProducer = shop.listProductsByProducer("Some Producer");
    assert(byProducer.length == 4);
    assert(byProducer[0] == "Some Product1");
    assert(byProducer[1] == "Some Product2" || byProducer[1] == "Some Product3");
    assert(byProducer[2] == "Some Product2" || byProducer[2] == "Some Product3");
    assert(byProducer[3] == "Some Product1");
}

function assert(condition) {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}

test(new ShopImpl());
