require("core-js");
require("reflect-metadata");

var angular = require("angular2");

var App = function() {};

App.annotations = [
  new angular.ComponentAnnotation({ selector: "app" }),
  new angular.ViewAnnotation({ template: require("./template.html") })
];

document.addEventListener("DOMContentLoaded", function() {
  angular.bootstrap(App);
});

