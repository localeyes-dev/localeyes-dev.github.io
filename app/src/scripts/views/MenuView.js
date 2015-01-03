'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BetterView = require('../extensions/BetterView');

var MenuView = BetterView.extend({
  tagName: 'ul',
  className: 'menu',
  template: '#menuTemplate',

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = MenuView;