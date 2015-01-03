'use strict';

var Backbone = require('backbone');

var BetterView = require('./BetterView');

var Page = BetterView.extend({
  name: '',
  
  in: function () {
    this.$el.css('opacity', 0);
    this.$el.velocity({
      opacity: 1
    }, { 
      duration: 500
    });
  },

  out: function (done) {
    this.$el.velocity({
      opacity: 0
    }, { 
      duration: 500,
      complete: done
    });
  }
});

module.exports = Page;