;(() => {
  'use strict';

  angular
    .module('frontend', [
      'ui.router',
    ]).config(config);

  config.$inject = ['$locationProvider'];

  function config($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  angular.module('frontend').run(run);

  run.$inject = [];

  function run() {
    /** noop */
  }
})();
