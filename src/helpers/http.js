import config from '../config/app';

export default function http({ uri, options = {}, isExternal = true }) {
  const url = isExternal ? config.externalHttpHostName : '';
  return fetch(`${url}${uri}`, options).then(rsp => rsp.json());
}
