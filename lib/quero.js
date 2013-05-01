/**
 * Query APIs and parse the results
 */

var request = require('request');

var apis = {
  stumbleupon: {
    url: 'http://www.stumbleupon.com/services/1.01/badge.getinfo?url='
  },
  pinterest: {
    url: 'http://api..com/v1/urls/count.json?url='
  }
};

function isURLSupplied (urls) {

  return (urls.length === 0 || urls == false || !urls);
}

exports.ping = function (urls, cb) {

  if (isURLSupplied(urls))
    cb(new Error('We need one or more of URLS'));
  else {
    request({
      uri: apis.stumbleupon.url + urls,
      method: 'GET'
    }, function (err, res, body) {
      var parsedBody = JSON.parse(body);
      cb(null, {stumbleupon: parsedBody.result.views});
    });
  }
};