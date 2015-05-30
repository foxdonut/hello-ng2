require("core-js");
require("reflect-metadata");

var angular = require("angular2");
var pubsub = require("./pubsub/pubsub-jquery");
var BookEvents = require("./events");

var bookResource = require("./resource/resource-jquery")("/books");
require("./books/store")(pubsub, bookResource);

var BookList = require("./books/bookList/component");

var App = function() {};

App.annotations = [
  new angular.ComponentAnnotation({ selector: "app" }),
  new angular.ViewAnnotation({
    template: require("./template.html"),
    directives: [ BookList ]
  })
];

document.addEventListener("DOMContentLoaded", function() {
  angular.bootstrap(App);
  pubsub.publish(BookEvents.READY);
});

