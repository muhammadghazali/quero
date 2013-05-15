/**
 * URL helper
 */

var _ = require('lodash');

/**
 * Build an api request url with url query is encoded uri component
 */
exports.buildRequestUrl = function (apiUrl, url) {

  return apiUrl.replace('URLHOLDER', encodeURIComponent(url));
};

/**
 * Validate url objects in Array. The url object should have a match property
 * like this:
 * {indentifier: 'foo', url: 'http://foo.bar/'}
 *
 * @param {Array} urls an array of urls
 * @param {Boolean} will return if the URLs is in valid format
 */
function isURLsFormatValid (urls) {

  for (var i = 0; i < urls.length; i++) {
    if (!urls[i].hasOwnProperty('identifier') || !urls[i].hasOwnProperty('url'))
      return false;
  }

  return true;
}

/**
 * Is an array
 *
 * @param {Array} urls an array of urls
 */
function isAnArray (urls) {

  return _.isArray(urls) && urls.length > 0;
}

/**
 * Validate urls
 *
 * TODO should validate the url string
 *
 * @param {Array} urls an array of urls
 * @return {Boolean} will return true if the validation successful
 */
exports.validateUrls = function (urls) {

  return (isAnArray(urls)) ? isURLsFormatValid(urls) : false;
};