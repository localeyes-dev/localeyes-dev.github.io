'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var FrameModel = require('../models/FrameModel');
var MapModel = require('../models/MapModel');

var CitiesCollection = require('../collections/CitiesCollection');

var FrameView = require('./FrameView');
var CityView = require('./CityView');

var CitiesView = Page.extend({
  name: 'cities',
  className: 'cities',
  template: _.template(jQuery('#citiesTemplate').html()),

  events: {
    'mouseover .frame__direction': 'onMouseOver',
    'mouseout .frame__direction': 'onMouseOut',
    'click .frame__direction': 'onClick'
  },

  onInitialize: function (options) {
    _.extend(this, _.pick(options, 'currentCity'));

    this.onKeydown = _.bind(this.onKeydown, this);
    jQuery(document).on('keydown', this.onKeydown);

    this.collection = this.collection || new CitiesCollection();

    this.map = new MapModel({ collection: this.collection });
    this.frame = new FrameView({ model: new FrameModel() });
    this.cities = this.collection.map(function (city) {
      return new CityView({ model: city, position: this.map.get(city.get('slug')).position });
    }, this);
  },

  onRemove: function () {
    jQuery(document).off('keydown', this.onKeydown);
  },

  onMouseOver: function (e) {
    var $el = jQuery(e.currentTarget);
    var direction = $el.data('direction');
    
    if (!direction) {
      return false;
    }
  
    var directions = this.map.getDirections(this.currentCity);

    if (direction === 'north' && directions.north) {
      console.log('open north');
    } else if (direction === 'east' && directions.east) {
      console.log('open east');
    } else if (direction === 'south' && directions.south) {
      console.log('open south');
    } else if (direction === 'west' && directions.west) {
      console.log('open west');
    }
  },

  onMouseOut: function (e) {

  },

  onKeydown: function (e) {
    var charCode = (e.charCode) ? e.charCode : e.keyCode;

    var directions = this.map.getDirections(this.currentCity);

    if (charCode === 38 && directions.north) {
      console.log('go north');
    } else if (charCode === 39 && directions.east) {
      console.log('go east');
    } else if (charCode === 40 && directions.south) {
      console.log('go south');
    } else if (charCode === 37 && directions.west) {
      console.log('go west');
    }
  },

  changeCity: function (slug) {
    if (slug !== this.currentCity && this.collection.findWhere({ slug: slug })) {
      this.currentCity = slug;
      this.updatePosition(true);
    }
  },

  updatePosition: function (transition) {
    var position = this.map.getPosition(this.currentCity);

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

    var directions = this.map.getDirections(this.currentCity);
    this.frame.model.set(directions);
  },

  render: function () {
    this.$el.html(this.template());
    this.prepend(this.frame);
    this.appendTo('.cities__content', this.cities);
    this.updatePosition(false);
    return this;
  }
});

module.exports = CitiesView;