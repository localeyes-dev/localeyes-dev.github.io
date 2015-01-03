'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BetterView = Backbone.View.extend({
  template: '',

  constructor: function () {
    this.template = _.template(jQuery(this.template).html());
    Backbone.View.prototype.constructor.apply(this, arguments);
  },

  initialize: function () {
    this.onInitialize.apply(this, arguments);
    Backbone.View.prototype.initialize.apply(this, arguments);
  },

  remove: function () {
    this.onRemove.apply(this, arguments);
    Backbone.View.prototype.remove.apply(this, arguments);
  },

  onInitialize: function () {},

  onRemove: function () {},

  prepend: function (views) {
    if (!_.isArray(views)) {
      views = [views];
    }

    var $el = this.$el;

    _.each(views, function (view) {
      $el.prepend(view.render().el);
    });
  },

  prependTo: function (selector, views) {
    if (!_.isArray(views)) {
      views = [views];
    }

    var $el = this.$(selector);

    _.each(views, function (view) {
      $el.prepend(view.render().el);
    });
  },

  append: function (views) {
    if (!_.isArray(views)) {
      views = [views];
    }

    var $el = this.$el;

    _.each(views, function (view) {
      $el.append(view.render().el);
    });
  },

  appendTo: function (selector, views) {
    if (!_.isArray(views)) {
      views = [views];
    }

    var $el = this.$(selector);

    _.each(views, function (view) {
      $el.append(view.render().el);
    });
  },

  assign: function (selector, view) {
    var selectors;

    if (_.isObject(selector)) {
      selectors = selector;
    } else {
      selectors = {};
      selectors[selector] = view;
    }

    if (!selectors) {
      return false;
    }

    _.each(selectors, function (view, selector) {
      view.setElement(this.$(selector)).render();
    }, this);
  }
});

module.exports = BetterView;