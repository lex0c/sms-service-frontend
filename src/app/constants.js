(() => {
  'use strict';

  angular
  	.module('frontend')
    .constant('CONSTANTS', {
      API_BASE_URL: 'https://sms-service-backend.herokuapp.com/api',
      // API_BASE_URL: 'http://localhost:4000/api',
      NOT_QWERTY: {
        2: ['A', 'B', 'C'],
        3: ['D', 'E', 'F'],
        4: ['G', 'H', 'I'],
        5: ['J', 'K', 'L'],
        6: ['M', 'N', 'O'],
        7: ['P', 'Q', 'R', 'S'],
        8: ['T', 'U', 'V'],
        9: ['W', 'X', 'Y', 'Z'],
        0: [' '],
      },
      GSM_CHARACTERS_LIMIT: 255,
    });
})();
