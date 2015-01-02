'use strict';

var Backbone = require('backbone');

var slug = require('../utils/slug');

var LocalModel = Backbone.Model.extend({
  defaults: {
    'name': undefined,
    'slug': undefined,
    'bio': undefined
  },

  initialize: function () {
    if (!this.has('slug')) {
      this.set({ slug: slug(this.get('name')) });
    }
  }
});

module.exports = LocalModel;