'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var slug = require('../utils/slug');

var CityModel = Backbone.Model.extend({
  defaults: {
    'name': '',
    'country': '',
    'slug': undefined,
    'north': undefined,
    'east': undefined,
    'south': undefined,
    'west': undefined,
    'northSlug': undefined,
    'eastSlug': undefined,
    'southSlug': undefined,
    'westSlug': undefined,
    'local': undefined,
    'localSlug': undefined,
    'paths': []
  },

  initialize: function () {
    var attrs = {};

    if (!this.has('slug')) {
      attrs.slug = slug(this.get('name'));
    }

    if (!this.has('localSlug') && this.has('local')) {
      attrs.localSlug = slug(this.get('local'));
    }

    _.each(['north', 'east', 'south', 'west'], function (direction) {
      if (this.has(direction) && !this.has(direction + 'Slug')) {
        attrs[direction + 'Slug'] = slug(this.get(direction));
      }
    }, this);

    this.set(attrs);
  }
});

module.exports = CityModel;