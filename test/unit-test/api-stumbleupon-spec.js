/**
 * Stumbleupon API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var stumbleuponApi = require('./../../lib/apis').stumbleupon;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: stumbleuponApi,
    'should load the module': function (topic) {
      assert.isObject(topic);
      assert.include(topic, 'query');
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);

vows.describe('Query the stumbleupon api should return total count')
  .addBatch({
  'Query the api': {
    topic: function () {
      stumbleuponApi.query('http://github.com', this.callback);
    },
    'should return the total count': function (err, result) {
      assert.isNull(err);
      assert.isNumber(result);
    }
  }
})
  .export(module);