var angular = require("angular2");
var BookEvents = require("../events");

module.exports = function(Pubsub) {
  var BookItem = function(pubsub) {
    this.onEdit = function(event, book) {
      event.preventDefault();
      console.log("book before:", book);
      book.title = "CHANGED";
      console.log("book after:", book);
      console.log("this book:", this.book);
      pubsub.publish(BookEvents.EDIT, book);
    };
    this.onDelete = function(event, book) {
      event.preventDefault();
      pubsub.publish(BookEvents.DELETE, book);
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
    self.bookList = [{title:"Test", author:"Test"}];

    self.onDataChange = function(bookList) {
      self.bookList.push({title:"Change", author:"Change"});
      console.log("bookList", self.bookList);
      /*
      var args = [0, self.bookList.length].concat(bookList);
      self.bookList.splice.apply(self.bookList, args);
      console.log("bookList now:", self.bookList);
      self.bookList = bookList;
      */
    };
    pubsub.subscribe(BookEvents.DATA, self.onDataChange);
    pubsub.publish(BookEvents.READY);

    self.handleClick = function() {
      console.log("handleClick");
      self.bookList.push({title:"Change", author:"Change"});
      console.log("bookList", self.bookList);
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
