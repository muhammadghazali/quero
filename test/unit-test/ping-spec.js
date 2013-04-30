/*
 * Ping test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var
  quero = {},
  urls = [
  'http://google.com',
  'http://facebook.com',
  'http://odesk.com',
  'http://elance.com',
  'http://parse.com',
  'http://github.com',
  'http://nodejs.org',
  'http://npmjs.org'
];

vows.describe('Should handle URLs argument properly')
  .addBatch({
  'Load module': {
    topic: function () {
      quero = require('./../../');
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
        quero.ping(urls[0], this.callback);
      },
      'should return a result if succeed': function (err, result) {
        assert.isNull(err);
        assert.isObject(result);
      }
    },
    'Handle one more than URLs': {
      topic: function (quero) {
        quero.ping(urls, this.callback);
      },
      'should return a result if succeed': function (err, result) {
        assert.isNull(err);
        assert.isObject(result);
      }
    },
    'Handle an empty URLs': {
      topic: function (quero) {
        quero.ping([], this.callback);
      },
      'should return a result if succeed': function (err, result) {
        assert.throws(err, Error);
        assert.isUndefined(result);
      }
    }
  }
})
  .export(module);
