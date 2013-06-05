/**
 * Pinterest API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var pinterestApi = require('./../../lib/apis').pinterest;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: pinterestApi,
    'should load the module': function (topic) {
      assert.isObject(topic);
      assert.include(topic, 'query');
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);

vows.describe('Query the pinterest api should return total count')
  .addBatch({
  'Query the api': {
    topic: function () {
      pinterestApi.query('http://github.com', this.callback);
    },
    'should return the total count': function (err, result) {
      assert.isNull(err);
      assert.isNumber(result);
    }
  }
})
  .export(module);