'use strict';

var Backbone = require('backbone');

var FrameModel = Backbone.Model.extend({
  defaults: {
    'north': undefined,
    'east': undefined,
    'south': undefined,
    'west': undefined
  }
});

module.exports = FrameModel;