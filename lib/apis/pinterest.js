var request = require('request');

var
  bodyUtil = require('./../utils/').body,
  urlUtil = require('./../utils/').url;

// api endpoint url
var apiUrl = 'http://api.pinterest.com/v1/urls/count.json?url=URLHOLDER';

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

      cb(null, {count: parsedBody.count});
    } else {
      cb(null, {count: false});
    }
  });
};