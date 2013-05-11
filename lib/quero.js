/**
 * Query APIs and parse the results
 */

var
  async = require('async'),
  request = require('request'),
  Step = require('step');

var apis = require('./apis');

/**
 * Validate urls
 *
 * TODO should validate the url string
 *
 * @param {Array} urls an array of url
 * @return {Boolean} will return true if the validation successful
 */
function validateUrls (urls) {

  var result = false;

  result = typeof urls === 'array' || urls.length > 0;

  if (urls.length > 1) {

    for (var i = 0; i < urls.length; i++) {
      urls[i].hasOwnProperty('identifier');
      urls[i].hasOwnProperty('url');
    }
  }

  return result;
}

/**
 * Parse JSON-RPC string into JSON
 * inspiration:
 * https://github.com/openmason/jsonrpclib/blob/
 * fc55ca5eb3e6d38842289098ecf32b939abf2455/index.js#L279
 *
 * @param {String} body json-rpc response body
 */
function parseJsonRpcString (body) {

  var trimmedBody = body.replace(/\s+/g, '');
  var parsedBody = trimmedBody
    .slice(trimmedBody.indexOf('(') + 1, trimmedBody.indexOf(')'))
    .match(/([^\s,]+)/g);

  return JSON.parse((parsedBody[0] + ',' + parsedBody[1]).toString());
}

/**
 * The actual function that will perform the actual API request
 *
 * @param {String} url API url
 * @param {Function} cb callback will return the results if the request succeed
 */
function requestHelper (url, cb) {

  var results = {};

  Step(
    function queryTwitter () {
      apis.twitter.query(url, this);
    },
    function queryStumbleupon (err, result) {
      results.twitter = result.count;

      apis.stumbleupon.query(url, this);
    },
    function queryPinterest (err, result) {
      results.stumbleupon = result.count;

      apis.pinterest.query(url, this);
    },
    function queryFacebook (err, result) {
      results.pinterest = result.count;

      apis.facebook.query(url, this);
    },
    function queryLinkedin (err, result) {
      results.facebook = result.count;

      apis.linkedin.query(url, this);
    },
    function (err, result) {
      results.linkedin = result.count;

      // now we return the populated results
      cb(null, results);
    }
  );
}

/**
 * A wrapper to query just one url
 *
 * @param {String} url a url string
 * @param {Function} cb will return the results if succeed
 */
function queryOneUrl (url, cb) {

  return requestHelper(url, function (err, results) {
    if (err)
      cb(err);
    else
      cb(null, results);
  });
}

/**
 * Query each of the APIs until the urls array index is passed
 *
 * @param {Array} urls list of urls
 * @param {Function} cb will return the query results if successful
 */
function query (urls, cb) {

  if (urls.length === 1)
    queryOneUrl(urls, cb);
  else if (urls.length > 1)
    cb(new Error('Query APIs more than one URLs is not supported yet'));
}

/**
 * Ping each of the urls.
 * Note: Currently we only support one ping only
 *
 * @param {Array} urls list of urls
 * @param {Function} cb will return the ping results if successful
 */
exports.ping = function (urls, cb) {

  if (!validateUrls(urls))
    cb(new Error('We need one or more of URLS'));
  else {
    query(urls, function (err, result) {
      if (err)
        cb(err);
      else if (result)
        cb(null, result);
    });
  }
};