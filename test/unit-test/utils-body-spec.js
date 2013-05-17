/**
 * Utils test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

var bodyUtils = require('./../../lib/utils/').body;

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: bodyUtils,
    'should load the module': function (topic) {
      assert.include(topic, 'parse');
      assert.isFunction(topic.parse);
    }
  }
})
  .export(module);

vows.describe('Parse response body')
  .addBatch({
  'Handle application/javascript;charset=utf-8 content type': {
    topic: function () {

      return bodyUtils.parse('application/javascript;charset=utf-8',
        'twttr.receiveCount/({"count":7020,"url":"http:\\/\\/google.com\\/"});');
    },
    'should parse the application/javascript body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  },
  'Handle application/javascript;charset=UTF-8 content type': {
    topic: function () {

      return bodyUtils.parse('application/javascript;charset=utf-8',
        '{"count":0,"fCnt":"0","fCntPlusOne":"1","url":"https:\/\/www.odesk.com\/home"}');
    },
    'should parse the application/javascript body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  },
  'Handle application/javascript content type': {
    topic: function () {

      return bodyUtils.parse('application/javascript',
        'receiveCount({"count": 0, "url": "https://www.odesk.com/home"})');
    },
    'should parse the application/javascript body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  },
  'Handle application/json content type': {
    topic: function () {

      return bodyUtils.parse('application/json',
        '{"url":"https:\/\/www.odesk.com\/home","normalized_url":"https:\/\/www.odesk.com\/home","share_count":9,"like_count":11,"comment_count":0,"total_count":20,"click_count":0,"comments_fbid":10150158925778482,"commentsbox_count":0}');
    },
    'should parse the application/javascript body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  },
  'Handle content type other than JSON': {
    topic: function () {

      return bodyUtils.parse('text/plain; charset=iso-8859-1',
        '{"result":{"url":"https:\/\/www.odesk.com\/home","in_index":true,"publicid":"2LC2PN","views":4,"title":"            Sign In - oDesk           ","thumbnail":"http:\/\/cdn.stumble-upon.com\/images\/nomthumb.png","thumbnail_b":"http:\/\/cdn.stumble-upon.com\/images\/nobthumb.png","submit_link":"http:\/\/www.stumbleupon.com\/submit\/?url=https:\/\/www.odesk.com\/home","badge_link":"http:\/\/www.stumbleupon.com\/badge\/?url=https:\/\/www.odesk.com\/home","info_link":"http:\/\/www.stumbleupon.com\/url\/https%253A\/\/www.odesk.com\/home"},"timestamp":1367185449,"success":true}');
    },
    'should parse the application/javascript body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  }
})
  .export(module);

vows.describe('Pass invalid arguments')
  .addBatch({
  'Should throw Error if content-type argument is not string': {
    topic: function () {
      return bodyUtils.parse(1,
        '{"result":{"url":"https:\/\/www.odesk.com\/home","in_index":true,"publicid":"2LC2PN","views":4,"title":"Sign In - oDesk           ","thumbnail":"http:\/\/cdn.stumble-upon.com\/images\/nomthumb.png","thumbnail_b":"http:\/\/cdn.stumble-upon.com\/images\/nobthumb.png","submit_link":"http:\/\/www.stumbleupon.com\/submit\/?url=https:\/\/www.odesk.com\/home","badge_link":"http:\/\/www.stumbleupon.com\/badge\/?url=https:\/\/www.odesk.com\/home","info_link":"http:\/\/www.stumbleupon.com\/url\/https%253A\/\/www.odesk.com\/home"},"timestamp":1367185449,"success":true}');
    },
    'should throw an Error':
      function (topic) {
        assert.throws(topic, Error);
        assert.isObject(topic);
      }
  },
  'Should throw Error if body argument is not string': {
    topic: function () {
      return bodyUtils.parse('application/json;charset=utf-8', 1);
    },
    'should throw an Error':
      function (topic) {
        assert.throws(topic, Error);
        assert.isObject(topic);
      }
  },
  'Should throw Error if arguments is not string': {
    topic: function () {
      return bodyUtils.parse(1, 1);
    },
    'should throw an Error':
      function (topic) {
        assert.throws(topic, Error);
        assert.isObject(topic);
      }
  }
})
  .export(module);