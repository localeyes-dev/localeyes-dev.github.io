'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BetterView = require('../extensions/BetterView');

var MenuView = require('./MenuView');

var AppView = BetterView.extend({
  className: 'app',
  template: _.template(jQuery('#appTemplate').html()),
  
  onInitialize: function () {
    this.menu = new MenuView();
  },

  changeView: function (view) {
    var previousView = this.view || null;
    var nextView = view;
    var nextViewName = nextView.name;

    var next = _.bind(function () {
      this.appendTo('.app__content', nextView);
      this.view = nextView;
      nextView.in();
    }, this);

    if (previousView) {
      previousView.out(
        function () { next(); },
        function () { previousView.remove(); },
        nextViewName
      );
    } else {
      next();
    }
  },

  currentView: function () {
    if (this.view) {
      return this.view;
    }
  },

  render: function () {
    this.$el.html(this.template());
    this.prepend(this.menu);
    return this;
  }
});

module.exports = AppView;