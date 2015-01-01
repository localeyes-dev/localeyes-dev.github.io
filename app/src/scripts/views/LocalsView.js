'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var CoverView = require('./CoverView');

var LocalsView = Page.extend({
  className: 'locals',
  template: _.template(jQuery('#localsTemplate').html()),

  renderCovers: function () {
    var $content = this.$('.locals__content');

    this.collection.each(function (local) {
      var view = new CoverView({ model: local });
      $content.prepend(view.render().el);
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.renderCovers();
    return this;
  }
});

module.exports = LocalsView;