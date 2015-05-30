require("core-js");
require("reflect-metadata");

var angular = require("angular2");
var pubsub = require("./pubsub/pubsub-jquery");
var Pubsub = function() {
  console.log("create Pubsub");
  this.pubsub = pubsub;
};
var BookEvents = require("./books/events");

var bookResource = require("./resource/resource-jquery")("/books");
require("./books/store")(pubsub, bookResource);

//var MyBookList = require("./books/bookList/component")(Pubsub);

////

  var BookList = function(pubsub) {
    console.log("creating BookList");
    var self = this;

    self.onDataChange = function(bookList) {
      self.bookList = bookList;
    };
    pubsub.subscribe(BookEvents.DATA, self.onDataChange);
  };
  BookList.annotations = [
    new angular.ComponentAnnotation({
      selector: "bookList",
      injectables: [Pubsub]
    }),
    new angular.ViewAnnotation({
      template: "BookList here" /* require("./bookList.html") ,
      directives: [ BookItem, angular.For ] */
    })
  ];
  BookList.parameters = [[Pubsub]];

console.log("Pubsub:", Pubsub);

////

var App = function() {
  console.log("create App");
};

App.annotations = [
  new angular.ComponentAnnotation({
    selector: "app",
    appInjector: [Pubsub]
  }),
  new angular.ViewAnnotation({
    template: require("./template.html"),
    directives: [ BookList ]
  })
];

document.addEventListener("DOMContentLoaded", function() {
  console.log("bootstrap");
  angular.bootstrap(App);
  pubsub.publish(BookEvents.READY);
  console.log("done");
});
