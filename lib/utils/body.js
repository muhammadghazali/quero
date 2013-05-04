/**
 * Parse JSON-RPC string into JSON
 * inspiration:
 * https://github.com/openmason/jsonrpclib/blob/
 * fc55ca5eb3e6d38842289098ecf32b939abf2455/index.js#L279
 *
 * @param {String} body json-rpc response body
 */

/**
 * Parse JSON RPC response
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

  return (contentType === 'application/json;charset=utf-8' ||
    contentType === 'application/json');
}

/**
 * Is content type a JSON
 *
 * @param {String} contentType response content type
 */
function isJsType (contentType) {

  return (contentType === 'application/javascript;charset=utf-8' ||
    contentType === 'application/javascript');
}

/**
 * @param {String} contentType content type (res.headers['content-type'])
 * @param {String} body HTTP reponse body
 */
exports.parse = function (contentType, body) {

  if (typeof contentType !== 'string' || typeof body !== 'string')
    throw new Error('Parameter should be a string');

  if (isJsType(contentType)) {
    return parseJsonRpc(body);
  } else if (isJsonType(contentType)) {
    return (JSON.parse(body));
  }
};