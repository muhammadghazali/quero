var
  vows = require('vows'),
  assert = require('assert');

vows.describe('Should be loaded')
.addBatch({
  'Load module': {
    topic: function () {
      return quero = require('./../../');
    },
      'should be loaded': function (topic) {
      assert.isObject(topic);
      assert.isNotNull(topic);
    }
  }
})
.export(module);
