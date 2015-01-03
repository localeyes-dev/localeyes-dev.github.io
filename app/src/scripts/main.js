'use strict';

// vendor
var jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = jQuery;

// router
var AppRouter = require('./routers/AppRouter');

// views
var AppView = require('./views/AppView');
var LoaderView = require('./views/LoaderView');
var HelpView = require('./views/HelpView');
var LocalsView = require('./views/LocalsView');
var LocalView = require('./views/LocalView');
var CitiesView = require('./views/CitiesView');

// utils
var random = require('./utils/random');

// modules
var Store = require('./modules/Store');

// main
var app = new AppView();
jQuery('.container').html(app.render().el);

var router = new AppRouter();

router.on('route:default', function () {
  app.changeView(new LoaderView());
});

router.on('route:help', function () {
  app.changeView(new HelpView());
});

router.on('route:locals', function () {
  app.changeView(new LocalsView({ collection: Store.getLocals() }));
});

router.on('route:local', function (slug) {
  var local = Store.getLocals().findWhere({ slug: slug });
  app.changeView(new LocalView({ model: local }));
});

var citiesView;

router.on('route:city', function (slug) {
  // update current view
  var currentView = app.currentView();
  if (currentView && currentView.name === 'cities' && citiesView) {
    return citiesView.changeCity(slug);
  }

  // create view
  var cities = Store.getCities();

  function randomSlug () {
    return cities.at(random(0, cities.length, true)).get('slug');
  };

  slug = slug ? cities.findWhere({ slug: slug }) ? slug : randomSlug() : randomSlug();

  citiesView = new CitiesView({ collection: cities, current: slug });
  app.changeView(citiesView);
});

Backbone.history.start();