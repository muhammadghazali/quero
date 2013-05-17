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
  quero = require('./../'),
  validUrls = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {identifier: 'npm homepage', url: 'http://npmjs.org'},
  {identifier: 'yahoo homepage', url: 'http://www.yahoo.com'},
  {identifier: 'google homepage', url: 'http://google.com'}
],
  invalidUrlsIdentifier = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {idexntifier: 'npm homepage', url: 'http://npmjs.org'}
],
  invalidUrls = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {identifier: 'npm homepage', urlo: 'http://npmjs.org'}
];

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: quero,
    'should load the module': function (topic) {
      assert.include(topic, 'ping');
      assert.isFunction(topic.ping);
    }
  }
})
  .export(module);

vows.describe('Should be able to ping more than one URLs')
  .addBatch({
  'Ping with valid urls': {
    topic: function () {
      quero.ping(validUrls, this.callback);
    },
    'should return a result if succeed': function (err, result) {
      assert.isNull(err);
      assert.isArray(result);
    }
  },
  'Ping with invalid urls indentifier format': {
    topic: function () {
      quero.ping(invalidUrlsIdentifier, this.callback);
    },
    'should throw an Error': function (err, result) {
      assert.isNotNull(err);
      assert.throws(err, Error);
      assert.equal(err.message, 'We need one or more of valid URLs');
      assert.isUndefined(result);
    }
  },
  'Ping with invalid urls format': {
    topic: function () {
      quero.ping(invalidUrls, this.callback);
    },
    'should throw an Error': function (err, result) {
      assert.isNotNull(err);
      assert.throws(err, Error);
      assert.equal(err.message, 'We need one or more of valid URLs');
      assert.isUndefined(result);
    }
  }
})
  .export(module);