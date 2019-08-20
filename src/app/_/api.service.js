(() => {
  'use strict';

  angular
    .module('frontend')
    .service('ApiService', ApiService);

  ApiService.$inject = ['$http', 'CONSTANTS'];

  function ApiService ($http, CONSTANTS) {
    this.query = (method, url, getParams, postParams, headers) => {
      return $http({
        method: method,
        url: `${CONSTANTS.API_BASE_URL}${url}`,
        params: getParams,
        data: postParams,
        headers: Object.assign({}, {
          'Content-Type': 'application/json'
        }, headers),
      });
    }
    return this;
  }
})();
