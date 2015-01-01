'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var MenuView = Backbone.View.extend({
  tagName: 'ul',
  className: 'menu',
  template: _.template(jQuery('#menuTemplate').html()),

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = MenuView;