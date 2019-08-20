(() => {
  'use strict';

  angular.module('frontend')
    .directive('msgBox', () => {
      return {
        templateUrl: 'app/_/directives/msg-box/msg-box.html',
        restrict: 'E',
        controller: ['$scope', $scope => {
          $scope.onchance = event => {
            $scope.totalChars = event.target.value.length.toString();
            $scope.keyup({ event: event });
          }
        }],
        scope: {
          title: '@',
          output: '=',
          limit: '=',
          keyup: '&',
        },
      };
    });
})();
