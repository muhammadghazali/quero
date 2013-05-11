/**
 * Request each of the APIs test suite
 */

var Step = require('step');

var apis = require('./');

/**
 * The actual function that will perform the actual API request
 *
 * @param {String} url API url
 * @param {Function} cb callback will return the results if the request succeed
 */
function requestHelper (url, cb) {

  if (!url || typeof url !== 'string')
    cb(new Error('Please, provide a valid URL string'));

  var results = {};

  Step(
    function queryTwitter () {
      apis.twitter.query(url, this);
    },
    function queryStumbleupon (err, result) {
      results.twitter = result.count;

      apis.stumbleupon.query(url, this);
    },
    function queryPinterest (err, result) {
      results.stumbleupon = result.count;

      apis.pinterest.query(url, this);
    },
    function queryFacebook (err, result) {
      results.pinterest = result.count;

      apis.facebook.query(url, this);
    },
    function queryLinkedin (err, result) {
      results.facebook = result.count;

      apis.linkedin.query(url, this);
    },
    function (err, result) {
      results.linkedin = result.count;

      // now we return the populated results
      cb(null, results);
    }
  );
}
;

/**
 * A wrapper to query just one url
 *
 * @param {String} url a url string
 * @param {Function} cb will return the results if succeed
 */
function queryOneUrl (url, cb) {

  return requestHelper(url, function (err, results) {
    if (err)
      cb(err);
    else
      cb(null, results);
  });
}

/**
 * A wrapper to query more than one url
 *
 * @param {String} urls an array of urls
 * @param {Function} cb will return the results if succeed
 */
function queryMoreThanOneUrl (urls, cb) {

  cb(null, []);
}

/**
 * Query each of the APIs until the urls array index is passed
 *
 * @param {Array} urls list of urls
 * @param {Function} cb will return the query results if successful
 */
module.exports = function (urls, cb) {

  if (urls.length === 1)
    queryOneUrl(urls[0].url, cb);
  else if (urls.length > 1)
    queryMoreThanOneUrl(urls, cb);
};