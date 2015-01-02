'use strict';

// vendor
var jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = jQuery;

// router
var AppRouter = require('./routers/AppRouter');

// collections
var LocalsCollection = require('./collections/LocalsCollection');
var CitiesCollection = require('./collections/CitiesCollection');

// views
var AppView = require('./views/AppView');
var LoaderView = require('./views/LoaderView');
var LocalsView = require('./views/LocalsView');
var LocalView = require('./views/LocalView');
var CitiesView = require('./views/CitiesView');
var HelpView = require('./views/HelpView');

// cached collections
var locals;
var cities;

function getLocals () {
  if (!locals) {
    locals = new LocalsCollection(window.locals);
  }

  return locals;
};

function getCities () {
  if (!cities) {
    cities = new CitiesCollection(window.cities);
  }

  return cities;
};

// main
var app = new AppView();
$('body').html(app.render().el);

var router = new AppRouter();

router.on('route:default', function () {
  var view = new LoaderView();
  app.changePage(view);
});

router.on('route:help', function () {
  var view = new HelpView();
  app.changePage(view);
});

router.on('route:locals', function () {
  var locals = getLocals();
  var view = new LocalsView({ collection: locals });
  app.changePage(view);
});

router.on('route:local', function (slug) {
  var locals = getLocals();
  var local = locals.findWhere({ slug: slug });
  var view = new LocalView({ model: local });
  app.changePage(view);
});

router.on('route:city', function (slug) {
  var cities = getCities();
  var city = cities.findWhere({ slug: slug });
  var view = new CitiesView({ collection: cities, model: city });
  app.changePage(view);
});

Backbone.history.start();