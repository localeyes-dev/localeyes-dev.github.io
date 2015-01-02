'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var CoverView = require('./CoverView');

var LocalsView = Page.extend({
  name: 'locals',
  className: 'locals',
  template: _.template(jQuery('#localsTemplate').html()),

  renderCovers: function () {
    var $els = [];

    this.collection.each(function (local) {
      var view = new CoverView({ model: local });
      $els.push(view.render().el)
    });

    return $els;
  },

  render: function () {
    this.$el.html(this.template());
    this.$('.locals__content').html(this.renderCovers());
    return this;
  }
});

module.exports = LocalsView;