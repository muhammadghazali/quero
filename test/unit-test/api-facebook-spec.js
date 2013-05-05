/**
 * Facebook API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: function () {
      return require('./../../lib/apis').facebook;
    },
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