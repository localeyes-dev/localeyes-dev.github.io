'use strict';

var Backbone = require('backbone');

var slug = require('../utils/slug');

var CityModel = Backbone.Model.extend({
  defaults: {
    'name': undefined,
    'slug': undefined,
    'north': undefined,
    'east': undefined,
    'south': undefined,
    'west': undefined,
    'northSlug': undefined,
    'eastSlug': undefined,
    'southSlug': undefined,
    'westSlug': undefined
  },

  initialize: function () {
    var attrs = {};

    if (!this.has('slug')) {
      attrs.slug = slug(this.get('name'));
    }

    if (this.has('north') && !this.has('northSlug')) {
      attrs.northSlug = slug(this.get('north'));
    }

    if (this.has('east') && !this.has('eastSlug')) {
      attrs.eastSlug = slug(this.get('east'));
    }

    if (this.has('south') && !this.has('southSlug')) {
      attrs.southSlug = slug(this.get('south'));
    }

    if (this.has('west') && !this.has('westSlug')) {
      attrs.westSlug = slug(this.get('west'));
    }

    this.set(attrs);
  }
});

module.exports = CityModel;