/**
 * Query APIs and parse the results
 */

var
  async = require('async'),
  request = require('request');

var
  apis = require('./apis'),
  urlUtil = require('./utils').url;

/**
 * A wrapper to query just one url
 *
 * @param {String} url a url string
 * @param {Function} cb will return the results if succeed
 */
function queryOneUrl (url, cb) {

  return apis.request(url, function (err, results) {
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
function query (urls, cb) {

  if (urls.length === 1)
    queryOneUrl(urls[0].url, cb);
  else if (urls.length > 1)
    queryMoreThanOneUrl(urls, cb);
}

/**
 * Ping each of the urls.
 * Note: Currently we only support one ping only
 *
 * @param {Array} urls list of urls
 * @param {Function} cb will return the ping results if successful
 */
exports.ping = function (urls, cb) {

  if (!urlUtil.validateUrls(urls))
    cb(new Error('We need one or more of valid URLs'));
  else {
    query(urls, function (err, result) {
      if (err)
        cb(err);
      else if (result)
        cb(null, result);
    });
  }
};