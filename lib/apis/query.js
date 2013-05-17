/**
 * Request each of the APIs test suite
 */

var async = require('async')

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

  async.parallel({
    facebook: async.apply(apis.facebook.query, url),
    linkedin: async.apply(apis.linkedin.query, url),
    pinterest: async.apply(apis.pinterest.query, url),
    stumbleupon: async.apply(apis.stumbleupon.query, url),
    twitter: async.apply(apis.twitter.query, url)
  }, function (err, results) {
    if (err)
      cb(err);
    else if (results)
      cb(null, results);
  });
}

/**
 * A wrapper to query just one url
 *
 * @param {String} urlItem a url string
 * @param {Function} cb will return the results if succeed
 */
function queryOneUrl (urlItem, cb) {

  return requestHelper(urlItem.url, function (err, results) {
    if (err) {
      cb(err);
    } else if (results) {
      var queryResults = [
        {
          identifier: urlItem.identifier,
          counts: results
        }
      ];

      cb(null, queryResults);
    }
  });
}

/**
 * A wrapper to iterate to each url.
 *
 * @param {String} urls an array of urls
 * @param {Function} cb will return the results if succeed
 */
function queryLooper (urls, cb) {

  async.concatSeries(urls, queryOneUrl, function (err, results) {
    if (err)
      cb(err);
    else if (results)
      cb(null, results);
  });
}

/**
 * Query each of the APIs until the urls array index is passed
 *
 * @param {Array} urls list of urls
 * @param {Function} cb will return the query results if successful
 */
module.exports = function (urls, cb) {

  if (urls.length >= 1)
    queryLooper(urls, cb);
};