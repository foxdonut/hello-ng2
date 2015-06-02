var angular = require("angular2-es5/angular2");
var BookEvents = require("../events");
//var zone = require("zone.js").zone;

module.exports = function(Pubsub) {
  var BookItem = function(pubsub) {
    this.onEdit = function(event, book) {
      event.preventDefault();
      pubsub.publish(BookEvents.EDIT, book);
    };
    this.onDelete = function(event, book) {
      event.preventDefault();
      pubsub.publish(BookEvents.DELETE, book);
      console.log("deleted:", book);
    };
  };
  BookItem.annotations = [
    new angular.ComponentAnnotation({
      selector: "bookItem",
      injectables: [Pubsub],
      properties: { book: "book" }
    }),
    new angular.ViewAnnotation({
      template: require("./bookItem.html")
    })
  ];
  BookItem.parameters = [[Pubsub]];

  var BookList = function(pubsub) {
    var self = this;
    self.bookList = [];

    self.onDataChange = function(bookList) {
      var args = [0, self.bookList.length].concat(bookList);
      self.bookList.splice.apply(self.bookList, args);
    };
    pubsub.subscribe(BookEvents.DATA, self.onDataChange);
    pubsub.publish(BookEvents.READY);

    self.handleClick = function() {
      self.bookList.push({title:"Change", author:"Change"});
    };
  };
  BookList.annotations = [
    new angular.ComponentAnnotation({
      selector: "bookList",
      injectables: [Pubsub]
    }),
    new angular.ViewAnnotation({
      template: require("./bookList.html"),
      directives: [angular.NgFor, BookItem]
    })
  ];
  BookList.parameters = [[Pubsub]];

  return BookList;
};
