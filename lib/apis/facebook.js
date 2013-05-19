var request = require('request');

var
  bodyUtil = require('./../utils').body,
  urlUtil = require('./../utils').url;

// api endpoint url
var apiUrl = 'http://api.ak.facebook.com/restserver.php?v=1.0&' +
  'method=links.getStats&urls=URLHOLDER&format=json';

/**
 * Handle specific Facebook API response
 */
function handleResponse (cb) {

  return function (err, res, body) {

    if (err)
      cb(err);
    else if (res.statusCode === 200) {
      var parsedBody = bodyUtil.parse(res.headers['content-type'], body);

      cb(null, parseInt(parsedBody[0].total_count, 10));
    } else {
      cb(null, false);
    }
  };
}

/**
 * @param {String} url the requested url to be query to the api
 * @param {Function} cb will return the result if API request successfull
 */
exports.query = function (url, cb) {

  request.get(urlUtil.buildRequestUrl(apiUrl, url), handleResponse(cb));
};