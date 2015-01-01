'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var HelpView = Page.extend({
  className: 'help',
  template: _.template(jQuery('#helpTemplate').html()),

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = HelpView;