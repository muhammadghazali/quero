var request = require('request');

var bodyUtil = require('./../utils/body');
var urlUtil = require('./../utils/url');

// api endpoint url
var apiUrl = 'http://www.linkedin.com/countserv/count/share?url=URLHOLDER&' +
  'format=json';

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