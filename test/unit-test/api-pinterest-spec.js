/**
 * Pinterest API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var pinterestApi = require('./../../lib/apis').facebook;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: pinterestApi,
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
      return pinterestApi.getUrl('http://github.com');
    },
    'should build the request url': function (topic) {
      assert.isString(topic);
    }
  }
})
  .export(module);