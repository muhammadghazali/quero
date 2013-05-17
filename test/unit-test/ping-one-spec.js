/*
 * Ping the APIs only one test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var quero = require('./../');

var validUrl = [{identifier: 'google homepage', url: 'http://google.com'}];
var invalidUrlIdentifier = [{idenifier: 'google homepage', url: 'http://google.com'}];
var invalidUrl = [{identifier: 'google homepage', ulrl: 'http://google.com'}];

function checkQueryResults (result) {

  return (result.hasOwnProperty('linkedin') ||
    result.hasOwnProperty('stumbleupon') ||
    result.hasOwnProperty('facebook') ||
    result.hasOwnProperty('twitter') ||
    result.hasOwnProperty('pinterest'));
}

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

vows.describe('Should be able to ping one url')
  .addBatch({
  'Ping with valid urls': {
    topic: function () {
      quero.ping(validUrl, this.callback);
    },
    'should return a result if succeed': function (err, result) {
      assert.isNull(err);
      assert.isArray(result);
      assert.isTrue(checkQueryResults(result[0].counts));
    }
  },
  'Ping with invalid url identifier format': {
    topic: function () {
      quero.ping(invalidUrlIdentifier, this.callback);
    },
    'should throw an Error': function (err, result) {
      assert.isNotNull(err);
      assert.throws(err, Error);
      assert.equal(err.message, 'We need one or more of valid URLs');
      assert.isUndefined(result);
    }
  },
  'Ping with invalid url format': {
    topic: function () {
      quero.ping(invalidUrl, this.callback);
    },
    'should throw an Error': function (err, result) {
      assert.isNotNull(err);
      assert.throws(err, Error);
      assert.equal(err.message, 'We need one or more of valid URLs');
      assert.isUndefined(result);
    }
  },
  'Should throw an Error if an array of urls is empty': {
    topic: function () {
      quero.ping([], this.callback);
    },
    'should throw an error': function (err, result) {
      assert.isNotNull(err);
      assert.throws(err, Error);
      assert.equal(err.message, 'We need one or more of valid URLs');
      assert.isUndefined(result);
    }
  },
  'Should throw an Error if we not passed an array of urls': {
    topic: function () {
      quero.ping('', this.callback);
    },
    'should throw an error': function (err, result) {
      assert.isNotNull(err);
      assert.throws(err, Error);
      assert.equal(err.message, 'We need one or more of valid URLs');
      assert.isUndefined(result);
    }
  }
})
  .export(module);