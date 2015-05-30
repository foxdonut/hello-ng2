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

var MyBookList = require("./books/bookList/component")(Pubsub);

var App = function() {
  console.log("create App");
};

App.annotations = [
  new angular.ComponentAnnotation({ selector: "app" }),
  new angular.ViewAnnotation({
    template: require("./template.html"),
    directives: [ MyBookList ]
  })
];

document.addEventListener("DOMContentLoaded", function() {
  console.log("bootstrap");
  angular.bootstrap(App);
  pubsub.publish(BookEvents.READY);
  console.log("done");
});
