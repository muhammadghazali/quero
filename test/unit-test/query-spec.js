var
  vows = require('vows'),
  assert = require('assert');

var apis = require('./../../lib/apis');

var validUrls = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {identifier: 'npm homepage', url: 'http://npmjs.org'},
  {identifier: 'yahoo homepage', url: 'http://www.yahoo.com'},
  {identifier: 'google homepage', url: 'http://google.com'}
];

vows.describe('Should load the module')
  .addBatch({
  'Load module': {
    topic: apis,
    'should load the module': function (topic) {
      assert.include(topic, 'query');
      assert.isFunction(topic.query);
    }
  }
})
  .export(module);

vows.describe('Should be able to ping one url')
  .addBatch({
  'Query valid urls': {
    topic: function () {
      apis.query(validUrls, this.callback);
    },
    'should return a result if succeed': function (err, result) {
      console.log('result', result);
      assert.isNull(err);
      assert.isArray(result);
      assert.isObject(result[0]);
    }
  }
})
  .export(module);
