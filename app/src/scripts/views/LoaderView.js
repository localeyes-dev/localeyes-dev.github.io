'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var LoaderView = Page.extend({
  className: 'loader',
  template: _.template(jQuery('#loaderTemplate').html()),

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = LoaderView;