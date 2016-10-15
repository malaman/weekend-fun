import config from '../config/app';

export default function http({ uri, options = {}, isExternal = false }) {
  const url = isExternal ? config.externalHttpHostName : '';
  return fetch(`${url}${uri}`, {...options, credentials: 'same-origin'}).then(rsp => rsp.json());
}
