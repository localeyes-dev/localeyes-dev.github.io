'use strict';

var LocalsCollection = require('../collections/LocalsCollection');
var CitiesCollection = require('../collections/CitiesCollection');

var Store = Store || (function () {

  var instance;

  function init () {

    var locals;
    var cities;

    return {
      getLocals: function () {
        if (!locals) {
          locals = new LocalsCollection(window.locals);
        }

        return locals;
      },

      getCities: function () {
        if (!cities) {
          cities = new CitiesCollection(window.cities);
        }

        return cities;
      }
    }
  };
    
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  }
})();

module.exports = Store.getInstance();