'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var LocalView = Page.extend({
  className: 'local',
  template: _.template(jQuery('#localTemplate').html()),

  in: function () {
    this.$('.local__name').css('opacity', 0);
    this.$('.local__name').velocity({
      opacity: 1
    }, {
      duration: 500
    });

    this.$('.local__bio').css('opacity', 0);
    this.$('.local__bio').velocity({
      opacity: 1
    }, {
      delay: 200,
      duration: 500
    });
  },

  out: function (done) {
    this.$('.local__name').velocity({
      opacity: 0
    }, {
      duration: 500
    });

    this.$('.local__bio').velocity({
      opacity: 0
    }, {
      delay: 200,
      duration: 500,
      complete: done
    });
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

module.exports = LocalView;