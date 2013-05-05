var request = require('request');

var bodyUtil = require('./../utils/body');
var urlUtil = require('./../utils/url');

// api endpoint url
var apiUrl = 'http://api.ak.facebook.com/restserver.php?v=1.0&' +
  'method=links.getStats&urls=URLHOLDER&format=json';

exports.query = function (url, cb) {

  request.get(urlUtil.buildRequestUrl(apiUrl, url), function (err, res, body) {

    if (err)
      cb(err);
    else if (res.statusCode === 200) {
      var parsedBody = bodyUtil.parse(res.headers['content-type'], body);

      cb(null, {count: parsedBody[0].total_count});
    } else {
      cb(null, {count: false});
    }
  });
};