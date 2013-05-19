var request = require('request');

var
  bodyUtil = require('./../utils').body,
  urlUtil = require('./../utils').url;

// api endpoint url
var API_URL = 'http://api.pinterest.com/v1/urls/count.json?url=URLHOLDER';

/**
 * Handle specific Pinterest API response
 *
 * @param {Function} cb will return the count number if succeed
 */
function handleResponse (cb) {

  return function (err, res, body) {

    if (err)
      cb(err);
    else if (res.statusCode === 200) {
      var parsedBody = bodyUtil.parse(res.headers['content-type'], body);

      cb(null, parseInt(parsedBody.count, 10));
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

  request.get(urlUtil.buildRequestUrl(API_URL, url), handleResponse(cb));
};