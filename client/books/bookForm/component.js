var angular = require("angular2");
var BookEvents = require("../events");

module.exports = function(Pubsub) {
  var BookForm = function(pubsub) {
    this.editing = false;
    this.book = {};

    this.onEdit = function(book) {
      this.book = book;
      this.editing = true;
    };

    pubsub.subscribe(BookEvents.EDIT, this.onEdit);

    this.onNew = function(event) {
      event.preventDefault();
      this.editing = true;
    };

    this.onSave = function(event, book) {
      event.preventDefault();
      pubsub.publish(BookEvents.SAVE, book);
      this.editing = false;
      this.book = {};
    };
    this.onCancel = function(event) {
      event.preventDefault();
      this.editing = false;
      this.book = {};
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
