'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var CityView = require('./CityView');

var CitiesView = Page.extend({
  className: 'cities',
  template: _.template(jQuery('#citiesTemplate').html()),

  events: {
    'mouseover .cities__direction': 'onMouseOver',
    'mouseout .cities__direction': 'onMouseOut'
  },

  initialize: function () {
    var map = this.getMap();
    this.setCoordinates(map);
  },

  onMouseOver: function (e) {
    var $el = jQuery(e.currentTarget);
    var props;

    if ($el.hasClass('cities__direction--north')
      || $el.hasClass('cities__direction--south')) {
      props = { height: 50 };
    } else {
      props = { width: 50 };
    }

    $el.velocity('stop').velocity(props, { duration: 300 });
  },

  onMouseOut: function (e) {
    var $el = jQuery(e.currentTarget);
    var props;

    if ($el.hasClass('cities__direction--north')
      || $el.hasClass('cities__direction--south')) {
      props = { height: 30 };
    } else {
      props = { width: 30 };
    }

    $el.velocity('stop').velocity(props, { duration: 300 });
  },

  getMap: function () {
    var map = {};

    var directions = [
      { name: 'north', left: 0, top: -1 },
      { name: 'east', left: 1, top: 0 },
      { name: 'south', left: 0, top: 1 },
      { name: 'west', left: -1, top: 0 }
    ];

    this.collection.each(function (city, i) {
      var name = city.get('name');
      var location = i === 0 ? { left: 0, top: 0 } : map[name];

      if (!map[name]) {
        map[name] = location;
      }

      _.each(directions, function (direction) {
        var value = city.get(direction.name);

        if (value && !map[value]) {
          var valueLocation = _.clone(location);
          valueLocation.top += direction.top;
          valueLocation.left += direction.left;
          map[value] = valueLocation;
        }
      });
    });

    console.log(map);

    return map;
  },

  setCoordinates: function (map) {
    // set locations on models
    // locations can also be passed with model
    // need to update CityModel
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        var city = this.collection.findWhere({ name: key });
        city.set({
          location: { left: map[key].left, top: map[key].top }
        });
      }
    }
  },

  goTo: function (city) {
    
  },

  renderCities: function () {
    var $content = this.$('.cities__content');

    this.collection.each(function (city) {
      var view = new CityView({ model: city });
      $content.prepend(view.render().el);
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.renderCities();
    return this;
  }
});

module.exports = CitiesView;