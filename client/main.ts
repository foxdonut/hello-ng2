//import { Component, View, bootstrap } from "angular2/angular2";
import { Component, View, bootstrap } from "../node_modules/angular2/angular2";

@Component({ selector: "app" })
//@View({ template: require("./template.html") })
@View({ template: "<h1>Hello, Angular2</h1>" })
class App {
}

bootstrap(App);

