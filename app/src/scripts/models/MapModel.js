'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var CitiesCollection = require('../collections/CitiesCollection');

var MapModel = Backbone.Model.extend({
  initialize: function (options) {
    Backbone.Model.prototype.initialize.call(this);
    _.extend(this, _.pick(options, 'collection'));

    this.collection = this.collection || new CitiesCollection();
    this.build();
  },

  build: function () {
    var map = {};

    var directions = [
      { name: 'north', left: 0, top: -1 },
      { name: 'east', left: 1, top: 0 },
      { name: 'south', left: 0, top: 1 },
      { name: 'west', left: -1, top: 0 }
    ];

    this.collection.each(function (city, i) {
      var slug = city.get('slug');
      var position = i === 0 ? { left: 0, top: 0 } : map[slug] ? map[slug].position : undefined;

      _.each(directions, function (direction) {
        var target = city.get(direction.name + 'Slug');

        if (target && !map[target]) {
          var targetPosition = _.clone(position);
          targetPosition.top += direction.top;
          targetPosition.left += direction.left;

          map[target] = {};
          map[target].position = targetPosition;

          var targetCity = this.collection.findWhere({ slug: target });
          map[target].directions = {
            north: targetCity.get('northSlug'),
            east: targetCity.get('eastSlug'),
            south: targetCity.get('southSlug'),
            west: targetCity.get('westSlug')
          };
        }
      }, this);
    }, this);

    this.set(map);
  },

  getPosition: function (slug) {
    return this.get(slug).position;
  },

  getDirections: function (slug) {
    return this.get(slug).directions;
  }
});

module.exports = MapModel;