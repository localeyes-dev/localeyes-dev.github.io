'use strict';

var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'default',
    'help': 'help',
    'locals': 'locals',
    'local/:slug': 'local',
    'city/:slug': 'city'
  }
});

module.exports = AppRouter;