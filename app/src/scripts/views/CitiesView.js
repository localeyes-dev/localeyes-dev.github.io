'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');
var FrameModel = require('../models/FrameModel');
var MapModel = require('../models/MapModel');
var FrameView = require('./FrameView');
var CityView = require('./CityView');

var CitiesView = Page.extend({
  name: 'cities',
  className: 'cities',
  template: _.template(jQuery('#citiesTemplate').html()),

  events: {
    'mouseover .cities__direction': 'onMouseOver',
    'mouseout .cities__direction': 'onMouseOut',
    'click .cities__direction': 'onClick'
  },

  initialize: function (options) {
    _.extend(this, _.pick(options, 'current'));

    this.onKeydown = _.bind(this.onKeydown, this);
    jQuery(document).on('keydown', this.onKeydown);

    this.map = new MapModel({ collection: this.collection });
    this.frame = new FrameView({ model: new FrameModel() });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    jQuery(document).off('keydown', this.onKeydown);
  },

  onKeydown: function (e) {
    var directions = this.map.get(this.current).directions;

    var charCode = (e.charCode) ? e.charCode : e.keyCode;

    switch (charCode) {
      case 38:
        console.log('up');
        console.log(directions.north);
        break;

      case 39:
        console.log('right');
        break;

      case 40:
        console.log('down');
        break;

      case 37:
        console.log('left');
        break;
    }
  },

  setCurrentCity: function (slug) {
    if (slug !== this.current && this.collection.findWhere({ slug: slug })) {
      this.current = slug;
      this.updatePosition(true);
    }
  },

  updatePosition: function (transition) {
    var position = this.map.get(this.current).position;

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

    var directions = this.map.get(this.current).directions;
    this.frame.model.set(directions);
  },

  renderCities: function () {
    var $els = [];

    this.collection.each(function (city) {
      var slug = city.get('slug');
      var view = new CityView({ model: city, position: this.map.get(slug).position });
      $els.push(view.render().el);
    }, this);

    return $els;
  },

  render: function () {
    this.$el.html(this.template());
    this.$el.prepend(this.frame.render().el);
    this.$('.cities__content').html(this.renderCities());

    this.updatePosition(false);

    return this;
  }
});

module.exports = CitiesView;