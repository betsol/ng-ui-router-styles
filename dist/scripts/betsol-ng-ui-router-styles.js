/**
 * betsol-ng-ui-router-styles - Load custom CSS for different routes
 * @version v0.2.2
 * @link https://github.com/betsol/ng-ui-router-styles
 * @license MIT
 *
 * @author Slava Fomin II <s.fomin@betsol.ru>
 */
(function (angular, window) {

  'use strict';

  var RESOLVE_NAME = '@loadStyles';
  var EVENTS_NAMESPACE = 'uiRouterStyles';
  var EVENT_LOADING_STARTED = 'loadingStarted';
  var EVENT_LOADING_FINISHED = 'loadingFinished';

  var nextResourceId = 1;
  var addedLinkElements = [];
  var targetState = null;

  angular.module('betsol.uiRouterStyles', ['ui.router'])

    .config(['$stateProvider', '$provide', function ($stateProvider, $provide) {

      // Using data decorator to normalize style definitions.
      $stateProvider.decorator('data', function (state, parent) {
        var data = parent(state);
        if (data && 'undefined' !== typeof data.css) {
          data.css = normalizeStyleDefinitions(data.css);
        }
        return data;
      });

      // Adding style resolve function for each registered state.
      $stateProvider.decorator('resolve', function (state, parent) {

        resolveFunction.$inject = ['$state', '$q', '$rootScope'];
        var definition = (parent ? parent(state) : (state.resolve || {}));

        definition[RESOLVE_NAME] = resolveFunction;

        return definition;

        /**
         * @ngInject
         *
         * @param {object} $state
         * @param {object} $q
         * @param {object} $rootScope
         *
         * @returns {Promise}
         */
        function resolveFunction ($state, $q, $rootScope) {
          if (targetState && targetState.name == state.name) {
            // Loading styles only when the resolve function of the target state is hit.
            // We don't want to load styles multiple times for each resolve function in the chain!
            return loadStylesForState(state, $state, $q, $rootScope);
          }
        }

      });

      // Forcing state reloading in order to always trigger resolve re-evaluation.
      $provide.decorator('$state', ['$delegate', function ($delegate) {
        var originalTransitionTo = $delegate.transitionTo;
        $delegate.transitionTo = function () {
          var optionsIndex = 2;
          arguments[optionsIndex] = angular.extend({
            reload: true
          }, arguments[optionsIndex]);
          return originalTransitionTo.apply(originalTransitionTo, arguments);
        };
        return $delegate;
      }]);

    }])

    .run(['$rootScope', function ($rootScope) {

      $rootScope.$on('$stateChangeStart', function (event, toState) {

        // Saving target state globally to later use it in resolve function.
        // Assuming that this event is called before the «resolves» are evaluated.
        // Right now UI Routers doesn't provide a way to access target state
        // from the resolve function.
        targetState = toState;

      });

    }])

    /**
     * Service could be used for configuration and API calls.
     */
    .provider('uiRouterStyles', function () {
      var service = {};
      var provider = {
        $get: function () {
          return service;
        }
      };
      return provider;
    })

  ;


  /**
   * Loads required styles for the specified state.
   *
   * @param {object} state
   * @param {object} $state
   * @param {object} $q
   * @param {object} $rootScope
   *
   * @returns {Promise}
   */
  function loadStylesForState (state, $state, $q, $rootScope) {

    $rootScope.$broadcast(EVENTS_NAMESPACE + '.' + EVENT_LOADING_STARTED);

    // Building chain of states from top to bottom.
    var stateChain = [];
    do {
      stateChain.unshift(state);
      state = (state.parent ? $state.get(state.parent) : null);
    } while (state);

    // Merging style definitions from all states together.
    var definitions = {};
    angular.forEach(stateChain, function (state) {
      if (state.data && state.data.css) {
        angular.extend(definitions, state.data.css);
      }
    });

    // Removing all previously loaded styles first.
    clearStyleDefinitions();

    // Adding required styles one-by-one.
    var promises = [];
    angular.forEach(definitions, function (definition) {
      promises.push(
        loadStyleDefinition(definition, $q)
      );
    });

    // Firing an event when all styles are loaded.
    return $q.all(promises).then(function () {
      $rootScope.$broadcast(EVENTS_NAMESPACE + '.' + EVENT_LOADING_FINISHED);
    });

  }

  /**
   * Normalizes style definitions specified by user in the state configuration.
   *
   * @param {*} definitions
   *
   * @returns {object}
   */
  function normalizeStyleDefinitions (definitions) {

    if ('string' === typeof definitions) {
      definitions = [definitions];
    }

    var normalizedDefinitions = {};

    // Making sure each entry has a unique resource ID.
    angular.forEach(definitions, function (definition, key) {

      if ('string' === typeof definition) {

        // Converting string definition to object.
        definition = {
          url: definition
        };

      } else if ('object' === typeof definition) {

        if (!definition.url) {
          log('state style definition must have URL specified');
          return;
        }

        // Using specified ID as new object key.
        if (definition.id) {
          key = definition.id;
        }

      }

      // Using custom unique resource ID instead of simple array index.
      if (isInt(key)) {
        key = generateResourceId();
      }

      definition.id = key;

      normalizedDefinitions[key] = definition;

    });

    return normalizedDefinitions;
  }

  function isInt (value) {
    return Number(value) === value && value % 1 === 0;
  }

  function generateResourceId () {
    return '@resource~' + nextResourceId++;
  }

  function log (message) {
    console.log('betsol-ng-ui-router-styles: ' + message);
  }

  /**
   * Adds <link> element to the page according to the specified style definition.
   *
   * @param {object} definition
   * @param {object} $q
   *
   * @return {Promise}
   */
  function loadStyleDefinition (definition, $q) {

    var deferred = $q.defer();

    if (window.loadStylesheet) {
      if (definition.url) {
        var linkElement = window.loadStylesheet(definition.url, function () {
          deferred.resolve();
        });
        // Maintaining convenient index of all added link elements.
        addedLinkElements.push(linkElement);
      } else {
        deferred.resolve();
      }
    } else {
      log('betsol-load-stylesheet module must be loaded');
      deferred.reject();
    }

    return deferred.promise;

  }

  /**
   * Removes all previously added <link> elements.
   */
  function clearStyleDefinitions () {
    angular.forEach(addedLinkElements, function (linkElement) {
      linkElement.remove();
    });
    addedLinkElements = [];
  }

})(angular, window);
