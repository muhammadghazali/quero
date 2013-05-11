var request = require('request');

var
  bodyUtil = require('./../utils').body,
  urlUtil = require('./../utils').url;

// api endpoint url
var apiUrl = 'http://www.stumbleupon.com/services/1.01/badge.getinfo?' +
  'url=URLHOLDER';

/**
 * @param {String} url the requested url to be query to the api
 * @param {Function} cb will return the result if API request successfull
 */
exports.query = function (url, cb) {

  request.get(urlUtil.buildRequestUrl(apiUrl, url), function (err, res, body) {

    if (err)
      cb(err);
    else if (res.statusCode === 200) {
      var parsedBody = bodyUtil.parse(res.headers['content-type'], body);

      cb(null, {count: parsedBody.result.views});
    } else {
      cb(null, {count: false});
    }
  });
};