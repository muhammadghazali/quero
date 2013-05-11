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
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);
