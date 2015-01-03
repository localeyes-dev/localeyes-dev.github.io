'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BetterView = require('../extensions/BetterView');

var CoverView = BetterView.extend({
  tagName: 'li',
  className: 'cover',
  template: '#coverTemplate',

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

module.exports = CoverView;