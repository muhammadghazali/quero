var request = require('request');

var bodyUtil = require('./../utils/body');

// api endpoint url
var apiUrl = 'http://api.pinterest.com/v1/urls/count.json?url=URLHOLDER';

// build api request url
exports.getUrl = function (url) {

  return apiUrl.replace('URLHOLDER', encodeURIComponent(url));
};

exports.query = function (url, cb) {

  request.get(buildUrl(url), function (err, res, body) {

    if (err)
      cb(err);
    else if (res.statusCode === 200) {
      var parsedBody = bodyUtil.parse(body);

      cb(null, {count: parsedBody.count});
    } else {
      cb(null, {count: false});
    }
  });
};