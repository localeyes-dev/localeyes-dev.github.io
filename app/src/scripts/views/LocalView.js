'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Page = require('../extensions/Page');

var LocalModel = require('../models/LocalModel');

var LocalView = Page.extend({
  name: 'local',
  className: 'local',
  template: '#localTemplate',

  onInitialize: function () {
    this.model = this.model || new LocalModel();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

module.exports = LocalView;