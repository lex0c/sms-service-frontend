const fs = require('fs');

const template = `(() => {
  'use strict';

  angular
    .module('frontend')
    .constant('CONFIG', {
      API_BASE_URL: '${process.env.API_BASE_URL}',
  });
})();
`;

fs.writeFile('./src/app/config.js', template, (err) => {
  if (err) throw new Error(err);
});
