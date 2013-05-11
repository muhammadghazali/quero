var
  vows = require('vows'),
  assert = require('assert');

var apis = {};

vows.describe('Should be loaded')
  .addBatch({
  'Load module': {
    topic: function () {
      return apis = require('./../../lib/apis');
    },
    'should be loaded': function (topic) {
      assert.isObject(topic);
      assert.isNotNull(topic);
      assert.isFunction(topic.request);
    }
  }
})
  .export(module);

vows.describe('Should request successfully')
  .addBatch({
  'Request': {
    topic: function () {
      apis.request('http://facebook.com', this.callback);
    },
    'should return results': function (err, results) {
      assert.isNull(err);
    }
  }
})
  .export(module);

vows.describe('Should failed if we passed an empty string')
  .addBatch({
  'Request': {
    topic: function () {
      apis.request('', this.callback);
    },
    'should return results': function (err, results) {
      assert.isNotNull(err);
      assert.throws(err, Error);
      assert.equal(err.message, 'Please, provide a valid URL string');
      assert.isUndefined(results);
    }
  }
})
  .export(module);
