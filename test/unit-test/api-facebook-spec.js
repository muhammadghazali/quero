/**
 * Facebook API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var facebookApi = require('./../../lib/apis').facebook;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: facebookApi,
    'should load the module': function (topic) {
      assert.isObject(topic);
      assert.include(topic, 'query');
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);

vows.describe('Query the facebook api should return total count')
  .addBatch({
  'Should build the request url': {
    topic: function () {
      facebookApi.query('http://github.com', this.callback);
    },
    'should return the total count': function (err, result) {
      assert.isNull(err);
      assert.isNumber(result);
    }
  }
})
  .export(module);