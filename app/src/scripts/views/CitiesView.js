'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var CityView = require('./CityView');

var CitiesView = Page.extend({
  name: 'cities',
  className: 'cities',
  template: _.template(jQuery('#citiesTemplate').html()),

  events: {
    'mouseover .cities__direction': 'onMouseOver',
    'mouseout .cities__direction': 'onMouseOut'
  },

  initialize: function (options) {
    _.extend(this, _.pick(options, 'current'));
    this.map = this.getMap();

    console.log(this.map.getPosition(this.current));
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

    map = _.extend(map, {
      getPosition: function (slug) {
        if (!this[slug]) {
          console.error(slug + ' is not present in map');
          return false;
        }

        return this[slug];
      }
    });

    return map;
  },

  renderCities: function () {
    var $els = [];

    this.collection.each(function (city) {
      var slug = city.get('slug');
      var view = new CityView({ model: city, position: this.map.getPosition(slug) });
      $els.push(view.render().el);
    }, this);

    return $els;
  },

  goTo: function (slug, transition) {
    var position = this.map.getPosition(slug);

    if (!position) {
      return false;
    }

    var props = {
      top: -1 * (position.top * 100) + '%',
      left: -1 * (position.left * 100) + '%'
    };

    if (transition) {
      this.$('.cities__content').velocity('stop').velocity(props, { duration: 800 });
    } else {
      this.$('.cities__content').css(props);
    }
  },

  setCurrent: function (slug) {
    if (slug !== this.current) {
      this.goTo(slug, true);
      this.current = slug;
    }
  },

  render: function () {
    this.$el.html(this.template());
    this.$('.cities__content').html(this.renderCities());
    this.goTo(this.current, false);
    return this;
  }
});

module.exports = CitiesView;