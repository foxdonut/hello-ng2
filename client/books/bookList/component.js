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

var BookList = function(pubsub) {
  var self = this;

  self.onDataChange = function(bookList) {
    self.bookList = bookList;
  };
  pubsub.subscribe(BookEvents.DATA, self.onDataChange);
};
BookList.annotations = [
  new angular.ComponentAnnotation({ selector: "bookList" }),
  new angular.ViewAnnotation({
    template: require("./bookList.html"),
    directives: [ BookItem, angular.For ]
  })
];

module.exports = BookList;
