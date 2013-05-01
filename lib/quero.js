/**
 * Query APIs and parse the results
 */

var
  request = require('request'),
  Step = require('step');

var apis = {
  linkedin: {
    url: 'http://www.linkedin.com/cws/share-count?url=URLHOLDER'
  },
  twitter: {
    url: 'http://urls.api.twitter.com/1/urls/count.json?url=URLHOLDER&callback=twttr.receiveCount'
  },
  facebook: {
    url: 'http://api.ak.facebook.com/restserver.php?v=1.0&method=links.getStats&urls=URLHOLDER&format=json'
  },
  stumbleupon: {
    url: 'http://www.stumbleupon.com/services/1.01/badge.getinfo?url=URLHOLDER'
  },
  pinterest: {
    url: 'http://api.pinterest.com/v1/urls/count.json?url=URLHOLDER'
  }
};

function isURLSupplied (urls) {

  return (urls.length === 0 || urls == false || !urls);
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

  var parsedBody = body
    .slice(body.indexOf('(') + 1, body.indexOf(')'))
    .match(/([^\s,]+)/g);

  return JSON.parse(parsedBody[0] + ',' + parsedBody[1]);
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
      var apiURI = apis.twitter.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function queryStumbleupon (err, res, body) {
      // add result from the previous request
      var parsedBody = parseJsonRpcString(body);
      results.twitter = parsedBody.count;

      var apiURI = apis.stumbleupon.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function queryFacebook (err, res, body) {
      // add result from the previous request
      var parsedBody = JSON.parse(body);
      results.stumbleupon = parsedBody.result.views;

      var apiURI = apis.facebook.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function (err, res, body) {
      // add result from the previous request
      var parsedBody = JSON.parse(body);
      results.facebook = parsedBody[0].total_count;

      // now we return the populated results
      cb(null, results);
    }
  );
}

// query each of the APIs until the urls array index is passed
function query (urls, cb) {

  if (typeof urls === 'string') {
    requestHelper(urls, function (err, result) {
      if (err)
        cb(err);
      else
        cb(null, result);
    });
  }
}

exports.ping = function (urls, cb) {

  if (isURLSupplied(urls))
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