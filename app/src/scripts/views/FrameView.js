'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var FrameView = Backbone.View.extend({
  className: 'frame',
  template: _.template(jQuery('#frameTemplate').html()),

  initialize: function () {
    this.listenTo(this.model, 'change', this.updateDirections);
  },

  updateDirections: function () {
    _.each(['north', 'east', 'south', 'west'], function (direction) {
      var $el = this.$('.frame__direction--' + direction);

      if (this.model.has(direction)) {
        var link = '#/city/' + this.model.get(direction);
        $el.attr('href', link).removeClass('is-inactive');
      } else {
        $el.attr('href', null).addClass('is-inactive');
      }

    }, this);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = FrameView;