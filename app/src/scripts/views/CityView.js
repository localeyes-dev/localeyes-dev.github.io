'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var CityView = Backbone.View.extend({
  className: 'city',
  template: _.template(jQuery('#cityTemplate').html()),

  setPosition: function () {
    var location = this.model.get('location');
    this.$el.css({
      left: (location.left * 100) + '%',
      top: (location.top * 100) + '%'
    });
  },

  centerContent: function () {
    var $name = this.$('.city__content');
    setTimeout(function () {
      $name.css({
        marginTop: -1 * ($name.height() / 2),
        marginLeft: -1 * ($name.width() / 2)
      });
    }, 50);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.setPosition();
    this.centerContent();
    return this;
  }
});

module.exports = CityView;