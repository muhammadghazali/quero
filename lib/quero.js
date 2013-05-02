/**
 * Query APIs and parse the results
 */

var
  async = require('async'),
  request = require('request'),
  Step = require('step');

var apis = {
  linkedin: {
    url: 'http://www.linkedin.com/countserv/count/share?url=URLHOLDER&format=json'
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

/**
 * Validate urls
 *
 * @param {Array} urls an array of url
 * @return {Boolean} will return false if the validation failed
 */
function validateUrls (urls) {

  // TODO should validate the url string

  return (!typeof urls === 'array' || urls.length === 0 || urls == false || !urls);
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
      var apiURI = apis.twitter.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function queryStumbleupon (err, res, body) {
      if (err)
        console.log('err', err);
      else if (res.statusCode === 200) {
        // add result from the previous request
        var parsedBody = parseJsonRpcString(body);

        results.twitter = parsedBody.count;
      } else {
        results.twitter = false;
      }

      var apiURI = apis.stumbleupon.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function queryPinterest (err, res, body) {
      if (err)
        console.log('err', err);
      else if (res.statusCode === 200) {
        var parsedBody = JSON.parse(body);

        if (parsedBody.success) {
          // add result from the previous request
          results.stumbleupon = parseInt(parsedBody.result.views, 10);
        }
      } else {
        // add result from the previous request
        results.stumbleupon = false;
      }

      var apiURI = apis.pinterest.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function queryFacebook (err, res, body) {
      if (err)
        console.log('err', err);
      else if (res.statusCode === 200) {
        // add result from the previous request
        var parsedBody = parseJsonRpcString(body);
        results.pinterest = parsedBody.count;
      } else {
        results.pinterest = false;
      }

      var apiURI = apis.facebook.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function queryLinkedin (err, res, body) {
      if (err)
        console.log('err', err);
      else if (res.statusCode === 200) {
        // add result from the previous request
        var parsedBody = JSON.parse(body);
        results.facebook = parsedBody[0].total_count;
      } else {
        // add result from the previous request
        var parsedBody = JSON.parse(body);
        results.facebook = false;
      }

      var apiURI = apis.linkedin.url.replace('URLHOLDER', url);
      request.get(apiURI, this);
    },
    function (err, res, body) {
      if (err)
        cb(err);
      else if (res.statusCode === 200) {
        // add result from the previous request
        var parsedBody = JSON.parse(body);
        results.linkedin = parsedBody.count;
      }

      // now we return the populated results
      cb(null, results);
    }
  );
}

/**
 * A wrapper to query just one url
 */
function queryOneUrl (urls, cb) {

  return requestHelper(urls, function (err, results) {
    if (err)
      cb(err);
    else
      cb(null, results);
  });
}

// query each of the APIs until the urls array index is passed
function query (urls, cb) {

  if (urls.length === 1)
    queryOneUrl(urls, cb);
}

exports.ping = function (urls, cb) {

  if (validateUrls(urls))
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