/*
 * Ping the APIs only one test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var
  quero = {},
  urls = ['http://google.com'];

function checkQueryResults (result) {

  return (result.hasOwnProperty('linkedin') ||
    result.hasOwnProperty('stumbleupon') ||
    result.hasOwnProperty('facebook') ||
    result.hasOwnProperty('twitter') ||
    result.hasOwnProperty('pinterest'));
}

vows.describe('Should throw an Error if an array of urls is empty')
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
        quero.ping([], this.callback);
      },
      'should throw an error': function (err, result) {
        assert.isNotNull(err);
        assert.throws(err, Error);
        assert.equal(err.message, 'We need one or more of URLS');
        assert.isUndefined(result);
      }
    }
  }
})
  .export(module);

vows.describe('Should be able to ping one URL')
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
        quero.ping(urls, this.callback);
      },
      'should return a result if succeed': function (err, result) {
        console.log('result', result);
        assert.isNull(err);
        assert.isObject(result);
        assert.isTrue(checkQueryResults(result));
      }
    }
  }
})
  .export(module);