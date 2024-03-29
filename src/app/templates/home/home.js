(() => {
  'use strict';

  angular
    .module('frontend')
    .component('home', {
      templateUrl: 'app/templates/home/home.html',
      controllerAs: 'vm',
      controller: HomeCtrl
    });

  HomeCtrl.$inject = ['$scope', 'CONSTANTS', 'Utils', 'HomeService'];

  function HomeCtrl($scope, CONSTANTS, Utils, HomeService) {
    const vm = this;

    // TODO: bug ((Z*255)+(_*254))=(chars=1274)
    vm.limit = CONSTANTS.GSM_CHARACTERS_LIMIT;

    vm.output = { text: '', sequence: '', type: null };
    vm.logs = [];

    vm.blur = blur.bind(this);

    vm.throttle = Utils.throttle(() => {
      if (!vm.output.sequence.length) return;
      vm.logs.push({
        created_at: new Date(),
        payload: { ...vm.output },
    });
      HomeService.saveLog({ payload: vm.output });
      $scope.$apply();
    }, 1000);

    (function constructor() {
      HomeService.getLogs().then(resp => {
        vm.logs = resp.data.logs;
      });
    })()

    function blur(ev) {
      const value = ev.target.value;
      if (Number.isInteger(parseInt(value))) {
        vm.output.text = decode(value);
        vm.output.sequence = encode(vm.output.text);
        vm.output.type = 'decode';
      } else {
        if (value.length > vm.limit) return;
        vm.output.sequence = encode(value.toUpperCase());
        vm.output.text = decode(vm.output.sequence);
        vm.output.type = 'encode';
      }
      vm.throttle();
    }

    const decode = value => {
      // Poderia ser mais eficiente se fizesse o diff do estado anterior
      // com o novo estado para iterar somente nessa diferença...
      return Utils.decode(value, CONSTANTS.NOT_QWERTY);
    }

    const encode = value => {
      // Poderia ser mais eficiente se fizesse o diff do estado anterior
      // com o novo estado para iterar somente nessa diferença...
      return Utils.encode(value, CONSTANTS.NOT_QWERTY);;
    }
  }
})();
