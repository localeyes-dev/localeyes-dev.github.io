'use strict';

var jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BetterView = require('../extensions/BetterView');

var CityView = BetterView.extend({
  className: 'city',
  template: _.template(jQuery('#cityTemplate').html()),

  onInitialize: function (options) {
    _.extend(this, _.pick(options, 'position'));
    this.position = this.position || { left: 0, top: 0 };
  },

  setPosition: function () {
    this.$el.css({
      left: (this.position.left * 100) + '%',
      top: (this.position.top * 100) + '%'
    });
  },

  in: function () {
    var squareWidth = 5;

    // squares
    this.$('.city__square--topLeft').css({ top: '50%', left: '50%', opacity: 0 })
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.$('.city__square--topRight').css({ top: '50%', right: '50%', opacity: 0 })
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ top: 0 }, { duration: 400, delay: 200 });

    this.$('.city__square--bottomLeft').css({ bottom: '50%', left: '50%', opacity: 0 })
      .velocity({ left: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 200 });

    this.$('.city__square--bottomRight').css({ bottom: '50%', right: '50%', opacity: 0 })
      .velocity({ right: 0, opacity: 1 }, { duration: 400, delay: 500 })
      .velocity({ bottom: 0 }, { duration: 400, delay: 200 });

    // text
    this.$('.city__name').css({ opacity: 0, top: -90 })
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1100 });

    this.$('.city__country').css({ opacity: 0, top: 50 })
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1200 });

    // icon
    this.$('.city__icon').css({ opacity: 0, top: -150 })
      .velocity({ opacity: 1, top: -90 }, { duration: 800, delay: 1200 });

    // button
    this.$('.city__button').css({ opacity: 0, top: 50 })
      .velocity({ opacity: 1, top: 0 }, { duration: 500, delay: 1300 });

    this.$('.city__border--top, .city__border--bottom').css('width', 0)
      .velocity({ width: '100%' }, { duration: 500, delay: 1400, display: 'block' });

    this.$('.city__border--left, .city__border--right').css('height', 0)
      .velocity({ height: '100%' }, { duration: 500, delay: 1400, display: 'block' });

    // svg
    this.$('svg').each(function () {
      var $paths = jQuery('path', this);

      $paths.each(function () {
        var $path = jQuery(this);
        var length = $path[0].getTotalLength();

        $path.velocity({
            'stroke-dashoffset': length,
            'stroke-dasharray': length + ',' + length,
            fillOpacity: 0,
            strokeOpacity: 1
          }, 0)
          .velocity({ 'stroke-dashoffset': 0 }, { duration: 2000, delay: 1100 })
          .velocity({ fillOpacity: 1, strokeOpacity: 0 }, { duration: 500 });
      });
    });

    // background
    this.$('.city__background').velocity({ scale: 1.2 }, 0)
      .velocity({ scale: 1 }, { duration: 1500 });
  },

  out: function () {
    this.$('.city__background')
      .velocity({ scale: 1.2 }, { duration: 1000 });
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.setPosition();
    return this;
  }
});

module.exports = CityView;