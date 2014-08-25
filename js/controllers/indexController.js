
// Dynamically set the logoUrl based on the cdnUrl
App.IndexController = Ember.ObjectController.extend({
  init: function() {
    this.logoUrl = App.get('aerobaticConfig').cdnUrl + '/images/aerobatic-logo.png';
  }
});
