var request = require('request');

var bodyUtil = require('./../utils/body');

// api endpoint url
var url = 'http://api.ak.facebook.com/restserver.php?v=1.0&' +
  'method=links.getStats&urls=URLHOLDER&format=json';

// build api request url
exports.getUrl = function (url) {

  return url.replace('URLHOLDER', url);
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