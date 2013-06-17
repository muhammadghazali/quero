/**
 * Response body helpers
 */

var _ = require('lodash');

var
  JSON_UTF8_LOWER_TYPE = 'application/json; charset=utf-8',
  JSON_UTF8_UPPER_TYPE = 'application/json; charset=UTF-8',
  JSON_UTF8_LOWER_TYPE_SPACE = 'application/json;charset=utf-8',
  JSON_TYPE = 'application/json';

var
  JS_UTF8_LOWER_TYPE = 'application/javascript; charset=utf-8',
  JS_UTF8_UPPER_TYPE = 'application/javascript; charset=UTF-8',
  JS_UTF8_LOWER_TYPE_SPACE = 'application/javascript;charset=utf-8',
  JS_TYPE = 'application/javascript';

/**
 * Parse JSON-RPC string into JSON
 * inspiration:
 * https://github.com/openmason/jsonrpclib/blob/
 * fc55ca5eb3e6d38842289098ecf32b939abf2455/index.js#L279
 *
 * @param {String} body json-rpc response body
 */
function parseJsonRpc (body) {

  var trimmedBody = body.replace(/\s+/g, '');
  var parsedBody = trimmedBody
    .slice(trimmedBody.indexOf('(') + 1, trimmedBody.indexOf(')'))
    .match(/([^\s,]+)/g);

  return JSON.parse((parsedBody[0] + ',' + parsedBody[1]).toString());
}

/**
 * Is content type a JSON
 *
 * @param {String} contentType response content type
 */
function isJsonType (contentType) {

  return (contentType === JSON_UTF8_LOWER_TYPE ||
    contentType === JSON_UTF8_UPPER_TYPE ||
    contentType === JSON_UTF8_LOWER_TYPE_SPACE ||
    contentType === JSON_TYPE);
}

/**
 * Is content type a JSON
 *
 * @param {String} contentType response content type
 */
function isJsType (contentType) {

  return (contentType === JS_UTF8_LOWER_TYPE ||
    contentType === JS_UTF8_UPPER_TYPE ||
    contentType === JS_UTF8_LOWER_TYPE_SPACE ||
    contentType === JS_TYPE);
}

/**
 * @param {String} contentType content type (res.headers['content-type'])
 * @param {String} body HTTP reponse body
 */
exports.parse = function (contentType, body) {

  if (!(_.isString(contentType) && _.isString(body)))
    throw new Error('Parameter should be a string');

  if (isJsType(contentType))
    return parseJsonRpc(body);
  else if (isJsonType(contentType))
    return JSON.parse(body);
  else // we assume the output is JSON
    return JSON.parse(body);
};