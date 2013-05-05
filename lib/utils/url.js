/**
 * URL helper
 */

/**
 * Build an api request url with url query is encoded uri component
 */
exports.buildRequestUrl = function (apiUrl, url) {

  return apiUrl.replace('URLHOLDER', encodeURIComponent(url));
};