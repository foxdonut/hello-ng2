require("core-js");
require("reflect-metadata");
require("zone.js");
// https://github.com/angular/angular/blob/master/modules/angular2/docs/core/12_zones.md

var angular = require("angular2");
var pubsub = require("./pubsub/pubsub-jquery");
var Pubsub = function() {
  return pubsub;
};
var BookEvents = require("./books/events");

var bookResource = require("./resource/resource-jquery")("/books");
require("./books/store")(pubsub, bookResource);

var BookList = require("./books/bookList/component")(Pubsub);
var BookForm = require("./books/bookForm/component")(Pubsub);

var App = function() {
  this.obj = { val: "initial" };
  this.handleClick = function() {
    this.obj.val = "changed";
  };
};

App.annotations = [
  new angular.ComponentAnnotation({
    selector: "app",
    appInjector: [Pubsub]
  }),
  new angular.ViewAnnotation({
    template: require("./template.html"),
    directives: [BookList, BookForm]
  })
];

document.addEventListener("DOMContentLoaded", function() {
  angular.bootstrap(App);
});
