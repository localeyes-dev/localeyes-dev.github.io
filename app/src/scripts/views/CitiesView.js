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
    this.map = this.getMap();
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
      var slug = city.get('slug');
      var position = i === 0 ? { left: 0, top: 0 } : map[slug];

      if (!map[slug]) {
        map[slug] = position;
      }

      _.each(directions, function (direction) {
        var value = city.get(direction.name + 'Slug');

        if (value && !map[value]) {
          var valueLocation = _.clone(position);
          valueLocation.top += direction.top;
          valueLocation.left += direction.left;
          map[value] = valueLocation;
        }
      });
    });

    return map;
  },

  renderCities: function () {
    var $els = [];

    this.collection.each(function (city) {
      var slug = city.get('slug');
      var view = new CityView({
        model: city,
        position: this.map[slug]
      });
      $els.push(view.render().el);
    }, this);

    return $els;
  },

  render: function () {
    this.$el.html(this.template());
    this.$('.cities__content').html(this.renderCities());
    return this;
  }
});

module.exports = CitiesView;