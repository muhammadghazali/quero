/**
 * Query APIs and parse the results
 */


function isURLSupplied (urls) {

  return (!urls || urls == false);
}

exports.ping = function (urls, cb) {

  if (isURLSupplied(urls))
    cb(new Error('We need one or more of URLS'));
  
  cb(null, {fake: true});
};