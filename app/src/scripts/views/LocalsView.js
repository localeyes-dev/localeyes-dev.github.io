'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var CitiesCollection = require('../collections/CitiesCollection');

var CoverView = require('./CoverView');

var LocalsView = Page.extend({
  name: 'locals',
  className: 'locals',
  template: _.template(jQuery('#localsTemplate').html()),

  events: {
    'click .cover': 'onClick'
  },

  onInitialize: function () {
    this.collection = this.collection || new CitiesCollection();
    this.covers = this.collection.map(function (city) {
      return new CoverView({ model: city });
    });

    // state
    this.$lastClicked = null;
  },

  onClick: function (e) {
    this.$lastClicked = jQuery(e.currentTarget);
  },

  in: function () {
    _.each(this.covers, function (cover, i) {
      var delay = i * 200;
      cover.in(delay);
    });

    this.$('.locals__icon--close').css({ top: 0, opacity: 0 })
      .velocity({ top: 60, opacity: 1 }, { duration: 500, delay: 400 });
  },

  out: function (done, complete, nextView) {
    // if (nextView === 'local' && this.$lastClicked) {
    //   return this.outLocal.apply(this, arguments);
    // }

    _.delay(done, 800);
    _.delay(complete, 2000);

    _.each(this.covers, function (cover, i) {
      var delay = i * 200;
      cover.out(delay);  
    });

    this.$('.locals__icon--close')
      .velocity({ top: 0, opacity: 0 }, { duration: 500 });

    // scroll to top
    // this.$('.cover').first().velocity('scroll', {
    //   container: this.$('.locals__content'),
    //   duration: 1000,
    //   queue: false
    // });
  },

  outLocal: function (done, complete) {
    var $covers = this.$('.cover');
    var total = $covers.length - 1;

    _.delay(done, 1000);

    $covers.each(function (i) {
      var options = {
        duration: 1000,
        delay: i * 100
      };

      if (i === total) {
        options.complete = complete;
      }

      jQuery(this).velocity({ opacity: 0 }, options);
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.appendTo('.locals__content', this.covers);
    return this;
  }
});

module.exports = LocalsView;