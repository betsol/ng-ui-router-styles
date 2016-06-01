# betsol-ng-ui-router-styles

[![Bower version](https://badge.fury.io/bo/betsol-ng-ui-router-styles.svg)](http://badge.fury.io/bo/betsol-ng-ui-router-styles)
[![npm version](https://badge.fury.io/js/betsol-ng-ui-router-styles.svg)](http://badge.fury.io/js/betsol-ng-ui-router-styles)


This module for Angular.js [UI Router][ui-router] allows you to specify
CSS-resources for different states. It will make sure that specified
styles are loaded before the state is rendered.

With it, you could split your application into fully-independent layout
sections and get rid of style conflicts once and for all!


## Features

- Simple installation, no directives needed
- Straightforward and flexible resource definition
- Supports named resources with ability to override them down the chain
- All CSS is loaded during the `resolve` stage


## Installation

### Install library with *npm*

`npm i --save betsol-ng-ui-router-styles`


### Install library with *Bower*

`bower install --save betsol-ng-ui-router-styles`


### Add library to your page

``` html
<script src="/node_modules/betsol-ng-ui-router-styles/dist/scripts/betsol-ng-ui-router-styles.js"></script>
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

```javascript

angular
  .module('application', [
    'betsol.uiRouterStyles'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('root', {
        abstract: true,
        data: {
          // Single un-named resource defined:
          // Globally for entire application.
          css: '/css/root.css'
        }
      })
        .state('home', {
          url: '/',
          parent: 'root',
          data: {
            // Multiple named resources defined:
            // You could override them down the chain if you want.
            css: {
              home: '/css/home.css',
              dashboard: '/css/dashboard.css'
            }
          }
        })
          .state('home-about', {
            url: '/about',
            parent: 'home',
            data: {
              css: {

                // Disabling parent named resource:
                // You could also override it if you want.
                dashboard: null,

                // Adding another named resource:
                about: '/css/about.css',
              }
            }
          })
        .state('sign-up', {
          url: '/sign-up',
          parent: 'root',
          data: {
            // Mixed array-style definition.
            css: [

              // Un-named resource defined by URL:
              '/css/forms.css',

              // Complete resource definition object provided:
              { id: 'sign-up', url: '/css/sign-up.css' },

              // Minimal resource definition object with no name:
              { url: '/css/forms-extra.css' }

            ]
          }
        })
      ;
    })
;


```

## Events

This module fires the following events on the `$rootScope`:

- `uiRouterStyles.loadingStarted` when loading of stylesheets is started
- `uiRouterStyles.loadingFinished` when loading of stylesheets is finished

You can use these events to, for example, hide the content of the page using some animation
in order to prevent [FOUC][fouc].


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
  [fouc]:      https://en.wikipedia.org/wiki/Flash_of_unstyled_content
