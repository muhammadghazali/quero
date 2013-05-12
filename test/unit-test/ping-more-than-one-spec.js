/*
 * Ping the APIs more than one URL test suite
 * Acceptance criteria:
 * The script should also have the ability to accept an array of URLs
 * with identifiers, example:
 * [
 *    {"identifier": "yahoo homepage", "url": "http://www.yahoo.com"},
 *    {"identifier": "microsoft homepage", "url": "http://www.microsoft.com"}
 * ]
 *
 * If it is passed an array the results should also contain the identifier.
 */

var
  vows = require('vows'),
  assert = require('assert');

var
  quero = {},
  validUrls = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {identifier: 'npm homepage', url: 'http://npmjs.org'},
  {identifier: 'yahoo homepage', url: 'http://www.yahoo.com'},
  {identifier: 'google homepage', url: 'http://google.com'}
],
  invalidUrls = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {idexntifier: 'npm homepage', url: 'http://npmjs.org'}
];

vows.describe('Should be able to ping more than URLs')
  .addBatch({
  'Load module': {
    topic: function () {
      quero = require('./../');
      return quero;
    },
    'should be loaded': function (topic) {
      assert.isObject(topic);
      assert.isNotNull(topic);
    },
    'should have a ping function': function (topic) {
      assert.isFunction(topic.ping);
    },
    'Handle one URL': {
      topic: function (quero) {
        quero.ping(invalidUrls, this.callback);
      },
      'should return a result if succeed': function (err, result) {
        assert.isNotNull(err);
        assert.throws(err, Error);
        assert.equal(err.message, 'We need one or more of valid URLs');
        assert.isUndefined(result);
      }
    }
  }
})
  .export(module);

vows.describe('Should be able to ping more than URLs')
  .addBatch({
  'Load module': {
    topic: function () {
      quero = require('./../');
      return quero;
    },
    'should be loaded': function (topic) {
      assert.isObject(topic);
      assert.isNotNull(topic);
    },
    'should have a ping function': function (topic) {
      assert.isFunction(topic.ping);
    },
    'Handle one URL': {
      topic: function (quero) {
        quero.ping(validUrls, this.callback);
      },
      'should return a result if succeed': function (err, result) {
        assert.isNull(err);
        assert.isArray(result);
      }
    }
  }
})
  .export(module);