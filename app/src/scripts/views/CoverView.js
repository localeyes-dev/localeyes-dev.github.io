'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var CoverView = Backbone.View.extend({
  tagName: 'li',
  className: 'cover',
  template: _.template(jQuery('#coverTemplate').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

module.exports = CoverView;