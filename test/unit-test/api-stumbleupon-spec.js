/**
 * Stumbleupon API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var stumbleuponApi = require('./../../lib/apis').facebook;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: stumbleuponApi,
    'should load the module': function (topic) {
      assert.isObject(topic);
      assert.include(topic, 'getUrl');
      assert.include(topic, 'query');
      assert.isFunction(topic.getUrl);
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);

vows.describe('Should replace the url holder with encoded url')
  .addBatch({
  'Should build the request url': {
    topic: function () {
      return stumbleuponApi.getUrl('http://github.com');
    },
    'should build the request url': function (topic) {
      assert.isString(topic);
    }
  }
})
  .export(module);