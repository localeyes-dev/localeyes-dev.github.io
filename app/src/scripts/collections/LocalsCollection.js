'use strict';

var Backbone = require('backbone');

var LocalModel = require('../models/LocalModel');

var LocalsCollection = Backbone.Collection.extend({
  model: LocalModel
});

module.exports = LocalsCollection;