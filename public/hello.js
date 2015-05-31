System.register("hello", ["angular2/angular2"], function($__export) {
  "use strict";
  var __moduleName = "hello";
  var Component,
      View,
      bootstrap,
      NgIf,
      Hello;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      bootstrap = $__m.bootstrap;
      NgIf = $__m.NgIf;
    }],
    execute: function() {
      Hello = (function() {
        function Hello() {
          this.name = 'World';
          var $__0 = this;
          setTimeout((function() {
            $__0.name = 'NEW World';
          }), 2000);
        }
        return ($traceurRuntime.createClass)(Hello, {}, {});
      }());
      $__export("Hello", Hello);
      Object.defineProperty(Hello, "annotations", {get: function() {
          return [new Component({selector: 'hello'}), new View({
            template: "<span *ng-if=\"name\">Hello, {{name}}!</span>",
            directives: [NgIf]
          })];
        }});
      bootstrap(Hello);
    }
  };
});
