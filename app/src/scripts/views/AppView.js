'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var MenuView = require('./MenuView');

var AppView = Backbone.View.extend({
  className: 'app',
  template: _.template(jQuery('#appTemplate').html()),

  initialize: function () {
    this.menu = new MenuView();
  },

  changePage: function (view) {
    var previousView = this.currentPage || null;
    var nextView = view;

    var _this = this;

    function next () {
      nextView.render();
      _this.$('.app__content').append(nextView.$el);
      nextView.in();
      _this.currentPage = nextView;
    }

    if (previousView) {
      previousView.out(function () {
        previousView.remove();
        next();
      });
    } else {
      next();
    }
  },

  getCurrentPage: function () {
    if (this.currentPage) {
      return this.currentPage.name;
    }
  },

  render: function () {
    this.$el.html(this.template());
    this.$el.prepend(this.menu.render().el);
    return this;
  }
});

module.exports = AppView;