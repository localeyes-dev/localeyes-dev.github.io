'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var LocalsCollection = require('../collections/LocalsCollection');

var CoverView = require('./CoverView');

var LocalsView = Page.extend({
  name: 'locals',
  className: 'locals',
  template: '#localsTemplate',

  onInitialize: function () {
    this.collection = this.collection || new LocalsCollection();
    this.covers = this.collection.map(function (local) {
      return new CoverView({ model: local });
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.appendTo('.locals__content', this.covers);
    return this;
  }
});

module.exports = LocalsView;