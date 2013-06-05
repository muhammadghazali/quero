/**
 * Twitter API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var twitterApi = require('./../../lib/apis').twitter;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: twitterApi,
    'should load the module': function (topic) {
      assert.isObject(topic);
      assert.include(topic, 'query');
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);

vows.describe('Query the twitter api should return total count')
  .addBatch({
  'Query the twitter api': {
    topic: function () {
      twitterApi.query('http://github.com', this.callback);
    },
    'should return the total count': function (err, result) {
      console.log('err', err);
      console.log('result', result);
      assert.isNull(err);
      assert.isNumber(result);
    }
  }
})
  .export(module);