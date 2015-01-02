'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var CityView = Backbone.View.extend({
  className: 'city',
  template: _.template(jQuery('#cityTemplate').html()),

  initialize: function (options) {
    _.extend(this, _.pick(options, 'position'));
  },

  setPosition: function () {
    this.$el.css({
      left: (this.position.left * 100) + '%',
      top: (this.position.top * 100) + '%'
    });
  },

  centerContent: function () {
    var $content = this.$('.city__content');
    _.delay(function () {
      $content.css({
        marginTop: -1 * ($content.height() / 2),
        marginLeft: -1 * ($content.width() / 2)
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