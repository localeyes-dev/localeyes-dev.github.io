'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var MapModel = Backbone.Model.extend({
  initialize: function (options) {
    Backbone.Model.prototype.initialize.call(this);
    this.build(options.collection);
  },

  build: function (collection) {
    var map = {};

    var directions = [
      { name: 'north', left: 0, top: -1 },
      { name: 'east', left: 1, top: 0 },
      { name: 'south', left: 0, top: 1 },
      { name: 'west', left: -1, top: 0 }
    ];

    collection.each(function (city, i) {
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

          var targetCity = collection.findWhere({ slug: target });
          map[target].directions = {
            north: targetCity.get('northSlug'),
            east: targetCity.get('eastSlug'),
            south: targetCity.get('southSlug'),
            west: targetCity.get('westSlug')
          };
        }
      });
    });

    this.set(map);
  }
});

module.exports = MapModel;