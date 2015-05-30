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

var BookList = require("./books/bookList/component")(Pubsub);

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
    directives: [BookList]
  })
];

document.addEventListener("DOMContentLoaded", function() {
  console.log("bootstrap");
  angular.bootstrap(App);
  pubsub.publish(BookEvents.READY);
  console.log("done");
});
