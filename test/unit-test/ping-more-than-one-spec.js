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
  urls = [
  {identifier: 'nodejs homepage', url: 'http://nodejs.org'},
  {identifier: 'npm homepage', url: 'http://npmjs.org'},
  {identifier: 'yahoo homepage', url: 'http://www.yahoo.com'},
  {identifier: 'google homepage', url: 'http://google.com'},
  {identifier: 'facebook homepage', url: 'http://facebook.com'},
  {identifier: 'odesk homepage', url: 'http://odesk.com'},
  {identifier: 'elance homepage', url: 'http://elance.com'},
  {identifier: 'parse homepage', url: 'http://parse.com'},
  {identifier: 'github homepage', url: 'http://github.com'}
];

vows.describe('Should able to ping more than URLs')
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
      }
    }
  }
})
  .export(module);