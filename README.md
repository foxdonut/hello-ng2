# hello-ng2

Trying an example with Angular 2, using node and browserify.

* See the setup in `package.json`
* Run `npm i` (`i` is short for `install`)
* `npm run build` says:

> Error: Cannot find module 'angular2'

* Edit `node_modules/angular2/package.json` and add:

> "main": "./angular2"
> "repository": {} (to quiet warning)

* Should work now, try `npm start` and open `http://localhost:3000` in the browser.
