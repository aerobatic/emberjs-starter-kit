Ember.Application.initializer({
  name: 'aerobaticInit',
  initialize: function(container, application) {
    application.set('aerobaticConfig', window.__config__);
  }
});

App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route("index", { path: "/" });
});
