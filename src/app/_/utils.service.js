(() => {
  'use strict';

  angular
    .module('frontend')
    .service('Utils', Utils);

  Utils.$inject = [];

  function Utils() {

    // efficiency: o(n) :p
    this.decode = (value, qwerty) => {
      let seq = 0, output = '';
      for (let i = 0; i < value.length; i++) {
        const curr = qwerty[value[i]];
        if (value[i] === value[i + 1]) {
          seq++;
        } else {
          if (Reflect.has(qwerty, value[i])) {
            output += (seq < curr.length) ? curr[seq] : '[?]';
          }
          seq = 0;
        }
      }
      return output;
    }

    // efficiency: o(n) :p
    this.encode = (value, qwerty) => {
      let output = '';
      for (let i = 0; i < value.length; i++) {
        for (let key in qwerty) {
          const curr = qwerty[key];
          if (curr.includes(value[i])) {
            if (output.substr(-1) === key) output += '_';
            output += key.repeat(curr.indexOf(value[i]) + 1);
          }
        }
      }
      return output;
    }

    this.throttle = (callback, delay) => {
      let timeoutId = null;
      return () => {
        const context = this, args = arguments;
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        timeoutId = setTimeout(() => {
          callback.apply(context, args);
        }, delay);
      }
    }

    return this;
  }
})();
