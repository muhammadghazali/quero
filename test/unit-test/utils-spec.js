/**
 * Utils test suite
 */

var
  vows = require('vows'),
  assert = require('assert');

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: function () {
      return require('./../../lib/utils/');
    },
    'should load the module': function (topic) {
      assert.include(topic, 'body');
      assert.include(topic, 'url');
    }
  }
})
  .export(module);

vows.describe('Should load the module')
  .addBatch({
  'Load the module': {
    topic: function () {
      return require('./../../lib/utils/body');
    },
    'should load the module': function (topic) {
      assert.isObject(topic);
      assert.include(topic, 'parse');
      assert.isFunction(topic.parse);
    }
  }
})
  .export(module);

vows.describe('Should be able to parse application/javascript;charset=utf-8 body')
  .addBatch({
  'Load the module': {
    topic: function () {
      var body = require('./../../lib/utils/body');

      return body.parse('application/javascript;charset=utf-8',
        'twttr.receiveCount/({"count":7020,"url":"http:\\/\\/google.com\\/"});');
    },
    'should parse the application/javascript body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  }
})
  .export(module);

vows.describe('Should be able to parse application/javascript body')
  .addBatch({
  'Load the module': {
    topic: function () {
      var body = require('./../../lib/utils/body');

      return body.parse('application/javascript',
        'twttr.receiveCount/({"count":7020,"url":"http:\\/\\/google.com\\/"});');
    },
    'should parse the application/javascript body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  }
})
  .export(module);

vows.describe('Should be able to parse application/json body')
  .addBatch({
  'Load the module': {
    topic: function () {
      var body = require('./../../lib/utils/body');

      return body.parse('application/json;charset=utf-8',
        '{"result":{"url":"https:\/\/www.odesk.com\/home","in_index":true,"publicid":"2LC2PN","views":4,"title":"Sign In - oDesk           ","thumbnail":"http:\/\/cdn.stumble-upon.com\/images\/nomthumb.png","thumbnail_b":"http:\/\/cdn.stumble-upon.com\/images\/nobthumb.png","submit_link":"http:\/\/www.stumbleupon.com\/submit\/?url=https:\/\/www.odesk.com\/home","badge_link":"http:\/\/www.stumbleupon.com\/badge\/?url=https:\/\/www.odesk.com\/home","info_link":"http:\/\/www.stumbleupon.com\/url\/https%253A\/\/www.odesk.com\/home"},"timestamp":1367185449,"success":true}');
    },
    'should parse the application/json body successfully':
      function (topic) {
        assert.isObject(topic);
      }
  }
})
  .export(module);

vows.describe('Should throw Error if content-type is not string')
  .addBatch({
  'Load the module': {
    topic: function () {
      var body = require('./../../lib/utils/body');

      return body.parse(1,
        '{"result":{"url":"https:\/\/www.odesk.com\/home","in_index":true,"publicid":"2LC2PN","views":4,"title":"Sign In - oDesk           ","thumbnail":"http:\/\/cdn.stumble-upon.com\/images\/nomthumb.png","thumbnail_b":"http:\/\/cdn.stumble-upon.com\/images\/nobthumb.png","submit_link":"http:\/\/www.stumbleupon.com\/submit\/?url=https:\/\/www.odesk.com\/home","badge_link":"http:\/\/www.stumbleupon.com\/badge\/?url=https:\/\/www.odesk.com\/home","info_link":"http:\/\/www.stumbleupon.com\/url\/https%253A\/\/www.odesk.com\/home"},"timestamp":1367185449,"success":true}');
    },
    'should throw Error':
      function (topic) {
        assert.throws(topic, Error);
        assert.isObject(topic);
      }
  }
})
  .export(module);

vows.describe('Should throw Error if body is not string')
  .addBatch({
  'Load the module': {
    topic: function () {
      var body = require('./../../lib/utils/body');

      return body.parse('application/json;charset=utf-8', 1);
    },
    'should throw Error':
      function (topic) {
        assert.throws(topic, Error);
        assert.isObject(topic);
      }
  }
})
  .export(module);