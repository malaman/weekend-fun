/**
 * Creates deep clone of any JS data object
 *
 * @param {any} source js element
 */
export default function (src) {
  return JSON.parse(JSON.stringify(src));
};
