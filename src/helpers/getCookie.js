/**
 * Parses browser cookies and return cookie value (if any)
 *
 * @param {string} name cookie name
 * @returns {string} cookie value
 */
export default function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
}
