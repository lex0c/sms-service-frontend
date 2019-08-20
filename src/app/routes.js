(() => {
  'use strict';

  angular.module('frontend')
    .config(RoutingConfig);

  RoutingConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

  function RoutingConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', { url: '/', component: 'home' })

  }
})();
