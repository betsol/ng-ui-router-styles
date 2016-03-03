# betsol-ng-ui-router-styles

[![Bower version](https://badge.fury.io/bo/betsol-ng-ui-router-styles.svg)](http://badge.fury.io/bo/betsol-ng-ui-router-styles)
[![npm version](https://badge.fury.io/js/betsol-ng-ui-router-styles.svg)](http://badge.fury.io/js/betsol-ng-ui-router-styles)


This module for Angular.js allows you to specify different CSS resources
for different routes/states. It will load required resources on enter and
release on exit. This will allow you to split your application into
fully-independent sections.


## Features

- Simple installation
- Straightforward and flexible resource definition
- Supports [ui-router][ui-router]
- Supports named resources with ability to override them down the chain
- Fires event when all CSS resources are loaded

> Original `ng-route` is not yet supported.
> Please consider using `ui-router` instead.


## Installation

### Install library with *npm*

`npm i --save betsol-ng-ui-router-styles`


### Install library with *Bower*

`bower install --save betsol-ng-ui-router-styles`


### Add library to your page

``` html
<script src="/node_modules/betsol-ng-ui-router-styles/dist/betsol-ng-ui-router-styles.js"></script>
```

You should use minified version (`betsol-ng-ui-router-styles.min.js`) in production.


### Add dependency in your application's module definition

``` javascript
var application = angular.module('application', [
  // ...
  'betsol.uiRouterStyles'
]);
```


## Usage

@todo


## API

@todo


## Changelog

Please see the [changelog][changelog] for list of changes.


## Feedback

If you have found a bug or have another issue with the library —
please [create an issue][new-issue].

If you have a question regarding the library or it's integration with your project —
consider asking a question at [StackOverflow][so-ask] and sending me a
link via [E-Mail][email]. I will be glad to help.

Have any ideas or propositions? Feel free to contact me by [E-Mail][email].

Cheers!


## FAQ

@todo


## Developer guide

Fork, clone, create a feature branch, implement your feature, cover it with tests, commit, create a PR.

Run:

- `npm i && bower install` to initialize the project
- `gulp build` to re-build the dist files
- `gulp test` or `karma start` to test the code

Do not add dist files to the PR itself.
We will re-compile the module manually each time before releasing.


## Support

If you like this library consider to add star on [GitHub repository][repo-gh].

Thank you!


## License

The MIT License (MIT)

Copyright (c) 2016 Slava Fomin II, BETTER SOLUTIONS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

  [changelog]: changelog.md
  [so-ask]:    http://stackoverflow.com/questions/ask?tags=angularjs,javascript
  [email]:     mailto:s.fomin@betsol.ru
  [new-issue]: https://github.com/betsol/ng-ui-router-styles/issues/new
  [gulp]:      http://gulpjs.com/
  [repo-gh]:   https://github.com/betsol/ng-ui-router-styles
  [ui-router]: https://github.com/angular-ui/ui-router
