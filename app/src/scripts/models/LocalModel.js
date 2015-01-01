'use strict';

var Backbone = require('backbone');

var LocalModel = Backbone.Model.extend({
  defaults: {
    'name': 'unnamed',
    'bio': 'No bio provided'
  },

  initialize: function () {
    if (!this.has('slug')) {
      this.set({ slug: this.get('name').toLowerCase().replace(' ', '_') });
    }
  }
});

module.exports = LocalModel;