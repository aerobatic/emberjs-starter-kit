// http://emberjs.com/guides/testing/testing-controllers/
// https://github.com/rwjblue/ember-qunit
emq.globalize();
setResolver(Ember.DefaultResolver.create({namespace: App}));

window.__config__ = {
  cdnUrl: '//testcdn.com'
};

moduleFor('controller:index', 'Index Controller');

test('indexController exposes logoUrl attribute', function() {
  var ctrl = this.subject();
  equal(ctrl.logoUrl, __config__.cdnUrl + '/images/aerobatic-logo.png');
});
