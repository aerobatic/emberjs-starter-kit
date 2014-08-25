// Bootstrap file for karma. See http://karma-runner.github.io/0.12/plus/emberjs.html for details.
__karma__.loaded = function() {};

App.setupForTesting();
App.injectTestHelpers();

//this gate/check is required given that standard practice in Ember tests to is to call
//Ember.reset() in the afterEach/tearDown for each test.  Doing so, causes the application
//to 're-initialize', resulting in repeated calls to the initialize function below
var karma_started = false;
App.initializer({
  name: "run tests",
  initialize: function(container, application) {
    application.set('AerobaticConfig', window.__config__);

    if (!karma_started) {
      karma_started = true;
      __karma__.start();
    }
  }
});

// Workaround for karma-qunit not reporting the total number of tests.
// https://github.com/karma-runner/karma/issues/966
(function() {
  var testCount = 0;
  var qunitTest = QUnit.test;
  QUnit.test = window.test = function () {
    testCount += 1;
    qunitTest.apply(this, arguments);
  };
  QUnit.begin(function (args) {
    args.totalTests = testCount;
  });
})();
