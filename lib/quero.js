/**
 * Query APIs and parse the results
 */

var
  request = require('request'),
  Step = require('step');

var apis = {
  linkedin: {
    url: 'http://www.linkedin.com/cws/share-count?url=URLHOLDER'
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

function isURLSupplied (urls) {

  return (urls.length === 0 || urls == false || !urls);
}

// The actual function that will perform the actual API request
function requestHelper (uri, cb) {

  var results = {};

  Step(
    function queryStumbleupon () {
      var apiURI = apis.stumbleupon.url.replace('URLHOLDER', uri);
      request.get(apiURI, this);
    },
    function queryFacebook (err, res, body) {
      var parsedBody = JSON.parse(body);
      results.stumbleupon = parsedBody.result.views;

      var apiURI = apis.facebook.url.replace('URLHOLDER', uri);
      request.get(apiURI, this);
    },
    function (err, res, body) {
      var parsedBody = JSON.parse(body);
      results.facebook = parsedBody[0].total_count;
      cb(null, results);
    }
  );
}

// query each of the APIs until the urls array index is passed
function query (urls, cb) {

  if (typeof urls === 'string') {
    requestHelper(urls, function (err, result) {
      if (err)
        cb(err);
      else
        cb(null, result);
    });
  }
}

exports.ping = function (urls, cb) {

  if (isURLSupplied(urls))
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