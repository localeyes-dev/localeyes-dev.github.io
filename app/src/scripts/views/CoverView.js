'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BetterView = require('../extensions/BetterView');

var CoverView = BetterView.extend({
  tagName: 'li',
  className: 'cover',
  template: _.template(jQuery('#coverTemplate').html()),

  in: function (delay) {
    delay = delay || 0;

    this.$el.velocity({ rotateX: 30 }, 0)
      .velocity({ rotateX: 0, opacity: 1 }, { duration: 800, delay: delay });
  },

  out: function (delay) {
    delay = delay || 0;

    this.$el
      .velocity({ rotateX: -30, opacity: 0 }, { duration: 800, delay: delay });
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

module.exports = CoverView;