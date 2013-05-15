/**
 * Utils test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var urlUtils = require('./../../lib/utils/').url;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: urlUtils,
    'should load the module': function (topic) {
      assert.include(topic, 'buildRequestUrl');
      assert.include(topic, 'validateUrls');
      assert.isFunction(topic.buildRequestUrl);
      assert.isFunction(topic.validateUrls);
    }
  }
})
  .export(module);

vows.describe('Validate urls')
  .addBatch({
  'One url': {
    topic: urlUtils.validateUrls([
      {identifier: 'google homepage', url: 'http://google.com'}
    ]),
    'should return true': function (topic) {
      assert.isTrue(topic);
    }
  },
  'Two url': {
    topic: urlUtils.validateUrls([
      {identifier: 'google homepage', url: 'http://google.com'},
      {identifier: 'google homepage', url: 'http://google.com'}
    ]),
    'should return true': function (topic) {
      assert.isTrue(topic);
    }
  },
  'An empty array': {
    topic: urlUtils.validateUrls([]),
    'should return false': function (topic) {
      assert.isFalse(topic);
    }
  },
  'No identifier field': {
    topic: urlUtils.validateUrls([
      {ide: 'google homepage', url: 'http://google.com'},
      {ide: 'google homepage', url: 'http://google.com'}
    ]),
    'should return false': function (topic) {
      assert.isFalse(topic);
    }
  },
  'No url field': {
    topic: urlUtils.validateUrls([
      {identifier: 'google homepage', uro: 'http://google.com'}
    ]),
    'should return false': function (topic) {
      assert.isFalse(topic);
    }
  },
  'Not an array': {
    topic: urlUtils.validateUrls({}),
    'should return false': function (topic) {
      assert.isFalse(topic);
    }
  },
  'undefined': {
    topic: urlUtils.validateUrls(undefined),
    'should return false': function (topic) {
      assert.isFalse(topic);
    }
  }
})
  .export(module);

vows.describe('Build urls')
  .addBatch({
  'Passing valid arguments': {
    topic: urlUtils.buildRequestUrl('http://api.ak.facebook.com/' +
      'restserver.php?v=1.0&method=links.getStats&urls=URLHOLDER&format=json',
      'http://google.com'),
    'should return a string': function (topic) {
      assert.isString(topic);
    }
  }
})
  .export(module);