/**
 * Query APIs and parse the results
 */
exports.ping = function (urls, cb) {

  if (!urls || urls == false)
    cb(new Error('We need one or more of URLS'));

  cb(null, {fake: true});
};