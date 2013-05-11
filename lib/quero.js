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
    apis.query(urls, function (err, result) {
      if (err)
        cb(err);
      else if (result)
        cb(null, result);
    });
  }
};