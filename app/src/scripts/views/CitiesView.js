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
    'mouseover .frame__bar': 'onMouseOver',
    'mouseout .frame__bar': 'onMouseOut'
  },

  onInitialize: function (options) {
    _.extend(this, _.pick(options, 'currentCity'));

    this.onKeydown = _.bind(this.onKeydown, this);
    jQuery(document).on('keydown', this.onKeydown);

    this.collection = this.collection || new CitiesCollection();

    this.map = new MapModel({ collection: this.collection });
    this.frame = new FrameView({ model: new FrameModel() });
    this.cities = this.collection.map(function (city) {
      return new CityView({ model: city, position: this.map.getPosition(city.get('slug')) });
    }, this);

    // state
    this.isSliding = false;
    this.isOpen = false;
  },

  onRemove: function () {
    jQuery(document).off('keydown', this.onKeydown);
  },

  onMouseOver: function (e) {
    if (this.isSliding) {
      return false;
    }

    var $el = jQuery(e.currentTarget);
    var direction = $el.data('direction');
    
    if (!direction) {
      return false;
    }
    
    var position = this.map.getPosition(this.currentCity);
    var directions = this.map.getDirections(this.currentCity);

    var props;

    if (direction === 'north' && directions.north) {
      props = { translateY: (-1 * (position.top * 100)) + 10 + '%' };
    } else if (direction === 'east' && directions.east) {
      props = { translateX: (-1 * (position.left * 100)) - 10 + '%' };
    } else if (direction === 'south' && directions.south) {
      props = { translateY: (-1 * (position.top * 100)) - 10 + '%' };
    } else if (direction === 'west' && directions.west) {
      props = { translateX: (-1 * (position.left * 100)) + 10 + '%' };
    }

    if (props) {
      this.isOpen = true;
      this.$('.cities__content').velocity('stop').velocity(props, { duration: 500 });
    }
  },

  onMouseOut: function (e) {
    if (this.isSliding) {
      return false;
    }

    if (!this.isOpen) {
      return false;
    }

    this.isOpen = false;

    var position = this.map.getPosition(this.currentCity);

    var props = {
      translateY: -1 * (position.top * 100) + '%',
      translateX: -1 * (position.left * 100) + '%'
    };

    this.$('.cities__content').velocity('stop').velocity(props, { duration: 500 });
  },

  onKeydown: function (e) {
    var charCode = (e.charCode) ? e.charCode : e.keyCode;

    var keys = { up: 38, right: 39, down: 40, left: 37 };

    var directions = this.map.getDirections(this.currentCity);

    if (charCode === keys.up && directions.north) {
      this.frame.click('north');
    } else if (charCode === keys.right && directions.east) {
      this.frame.click('east');
    } else if (charCode === keys.down && directions.south) {
      this.frame.click('south');
    } else if (charCode === keys.left && directions.west) {
      this.frame.click('west');
    }
  },

  in: function () {
    this.$el.css('opacity', 0)
      .velocity('stop')
      .velocity({ opacity: 1 }, { duration: 500 });

    this.$('.frame__bar').each(function () {
      var $el = jQuery(this);
      var direction = $el.data('direction');
      
      if (!direction) {
        return true;
      }

      var props = {};
      var target = {};
      var options = { duration: 300, delay: 200 };

      if (direction === 'north') {
        props.top = -40;
        target.top = 0;
      } else if (direction === 'east') {
        props.right = -40;
        target.right = 0;
      } else if (direction === 'south') {
        props.bottom = -40;
        target.bottom = 0;
      } else if (direction === 'west') {
        props.left = -40;
        target.left = 0;
      }

      $el.css(props)
        .velocity('stop')
        .velocity(target, options);
    });
  },

  out: function (done) {
    this.$el.css('opacity', 1)
      .velocity('stop')
      .velocity({ opacity: 0 }, { duration: 500, delay: 200, complete: done });

    this.$('.frame__bar').each(function () {
      var $el = jQuery(this);
      var direction = $el.data('direction');
      
      if (!direction) {
        return true;
      }

      var props = {};
      var target = {};
      var options = { duration: 300 };

      if (direction === 'north') {
        props.top = 0;
        target.top = -40;
      } else if (direction === 'east') {
        props.right = 0;
        target.right = -40;
      } else if (direction === 'south') {
        props.bottom = 0;
        target.bottom = -40;
      } else if (direction === 'west') {
        props.left = 0;
        target.left = -40;
      }

      $el.css(props)
        .velocity('stop')
        .velocity(target, options);
    });
  },

  changeCity: function (slug) {
    var model = this.collection.findWhere({ slug: slug });
    var view = _.findWhere(this.cities, { model: model });

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
      translateY: -1 * (position.top * 100) + '%',
      translateX: -1 * (position.left * 100) + '%'
    };

    var options = {};

    if (transition) {
      this.isSliding = true;

      var onComplete = _.bind(function () {
        this.isSliding = false;
      }, this);

      options.duration = 800;
      options.complete = onComplete;
    } else {
      options.duration = 0;
    }

    this.$('.cities__content').velocity('stop').velocity(props, options);

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