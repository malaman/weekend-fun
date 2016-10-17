import config from '../config/app';
/**
 * Wrapper around fetch to perform external (to config.externalHttpHostName value) or local xhr calls
 * credentials: 'same-origin' is used to enable cookies for XHR calls for api calls authentication
 *
 * @param {String} uri pathname of the route
 * @param {Object} options fetch configuration object
 * @param {bool} isExternal if true request will be send to config.externalHttpHostName, otherwise to local hostname
 * @returns {Promise<U>|Thenable<U>|*|Promise.<TResult>} response promise
 */
export default function http({ uri, options = {}, isExternal = false }) {
  const url = isExternal ? config.externalHttpHostName : '';
  return fetch(`${url}${uri}`, {...options, credentials: 'same-origin'}).then(rsp => rsp.json());
}
