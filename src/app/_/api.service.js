(() => {
  'use strict';

  angular
    .module('frontend')
    .service('ApiService', ApiService);

  ApiService.$inject = ['$http', 'CONFIG'];

  function ApiService ($http, CONFIG) {
    this.query = (method, url, getParams, postParams, headers) => {
      return $http({
        method: method,
        url: `${CONFIG.API_BASE_URL}${url}`,
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
