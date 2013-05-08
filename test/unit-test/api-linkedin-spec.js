/**
 * LinkedIn API test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var linkedinApi = require('./../../lib/apis').linkedin;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: linkedinApi,
    'should load the module': function (topic) {
      assert.isObject(topic);
      assert.include(topic, 'query');
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);

vows.describe('Query the linkedin api should return total count')
  .addBatch({
  'Should build the request url': {
    topic: function () {
      linkedinApi.query('http://github.com', this.callback);
    },
    'should return the total count': function (err, result) {
      assert.isNull(err);
      assert.isObject(result);
      assert.include(result, 'count');
      assert.isNumber(result.count);
    }
  }
})
  .export(module);