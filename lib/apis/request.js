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
module.exports = function (url, cb) {

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
};