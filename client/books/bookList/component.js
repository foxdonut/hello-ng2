var angular = require("angular2");
var BookEvents = require("../events");

var BookItem = function() {
  this.onEdit = function() {
    //pubsub.publish(BookEvents.EDIT, this.props.book);
  };
  this.onDelete = function() {
    //pubsub.publish(BookEvents.DELETE, this.props.book);
  };
};
BookItem.annotations = [
  new angular.ComponentAnnotation({ selector: "bookItem" }),
  new angular.ViewAnnotation({ template: require("./bookItem.html") })
];

module.exports = function(Pubsub) {
  console.log("prepare BookList");
  var BookList = function(ps) {
    console.log("creating BookList");
    var self = this;
    self.bookList = [];

    self.onDataChange = function(bookList) {
      self.bookList = bookList;
    };
    ps.pubsub.subscribe(BookEvents.DATA, self.onDataChange);
  };
  BookList.annotations = [
    new angular.ComponentAnnotation({
      selector: "bookList",
      injectables: [Pubsub]
    }),
    new angular.ViewAnnotation({
      template: require("./bookList.html"),
      directives: [/*BookItem, angular.For*/]
    })
  ];
  BookList.parameters = [[Pubsub]];

  return BookList;
};
