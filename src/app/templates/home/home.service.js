(() => {
  'use strict';

  angular
    .module('frontend')
    .service('HomeService', HomeService);

  HomeService.$inject = ['ApiService'];

  function HomeService (ApiService) {
    this.getLogs = () => {
      return ApiService.query('GET', '/v1/logs', {}, {}, {})
        .then(resp => resp.data);
    }

    this.saveLog = payload => {
      return ApiService.query('POST', '/v1/logs', {} , { ...payload }, {})
      .then(resp => resp.data);
    }

    return this;
  }
})();
