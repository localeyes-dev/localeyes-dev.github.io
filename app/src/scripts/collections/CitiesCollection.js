'use strict';

var Backbone = require('backbone');

var CityModel = require('../models/CityModel');

var CitiesCollection = Backbone.Collection.extend({
  model: CityModel
});

module.exports = CitiesCollection;