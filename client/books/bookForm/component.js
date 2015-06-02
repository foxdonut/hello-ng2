var angular = require("angular2-es5/angular2");
var BookEvents = require("../events");

module.exports = function(Pubsub) {
  var BookForm = function(pubsub) {
    var self = this;

    self.editing = false;
    self.book = {};

    self.onEdit = function(book) {
      self.book = book;
      self.editing = true;
    };

    pubsub.subscribe(BookEvents.EDIT, self.onEdit);

    self.onNew = function(event) {
      event.preventDefault();
      self.editing = true;
    };

    self.onSave = function(event, author, title) {
      event.preventDefault();
      self.book.author = author;
      self.book.title = title;
      pubsub.publish(BookEvents.SAVE, self.book);
      self.editing = false;
      self.book = {};
    };
    self.onCancel = function(event) {
      event.preventDefault();
      self.editing = false;
      self.book = {};
    };
  };
  BookForm.annotations = [
    new angular.ComponentAnnotation({
      selector: "bookForm",
      injectables: [Pubsub]
    }),
    new angular.ViewAnnotation({
      template: require("./bookForm.html"),
      directives: [angular.NgIf]
    })
  ];
  BookForm.parameters = [[Pubsub]];

  return BookForm;
};
