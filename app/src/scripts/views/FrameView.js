'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BetterView = require('../extensions/BetterView');

var FrameView = BetterView.extend({
  className: 'frame',
  template: _.template(jQuery('#frameTemplate').html()),

  onInitialize: function () {
    this.listenTo(this.model, 'change', this.updateDirections);
  },

  updateDirections: function () {
    _.each(['north', 'east', 'south', 'west'], function (direction) {
      var $el = this.$('.frame__bar--' + direction);

      if (this.model.has(direction)) {
        var link = '#/city/' + this.model.get(direction);
        $el.attr('href', link).removeClass('is-inactive');
      } else {
        $el.attr('href', null).addClass('is-inactive');
      }

    }, this);
  },

  click: function (direction) {
    var $link = this.$('.frame__bar--' + direction);

    if (!$link.length) {
      return false;
    }

    $link[0].click();

    return false;
  },

  in: function () {
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

  out: function () {
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

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = FrameView;