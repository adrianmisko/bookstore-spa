import config from '../config';

export const queryServer = value => {
  return fetch(`${config.DOMAIN}/api/books?search=${value}`,
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => ({ data, status: 200 }))
    .catch(_ => ({ status: 500 }))
};
