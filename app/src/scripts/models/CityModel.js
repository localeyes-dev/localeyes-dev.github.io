'use strict';

var Backbone = require('backbone');

var CityModel = Backbone.Model.extend({
  defaults: {
    'name': 'unnamed',
    'north': null,
    'east': null,
    'south': null,
    'west': null,
    'location': {}
  },

  initialize: function () {
    if (!this.has('slug')) {
      this.set({ slug: this.get('name').toLowerCase().replace(' ', '_') });
    }
  }
});

module.exports = CityModel;