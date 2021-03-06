import config from '../config';

export const validateCredentials = ({ userName, password }) => {
  const headers = { 'Authorization': `Basic ${btoa(userName + ':' + password)}` };
  return fetch(`${config.DOMAIN}/api/token`, { mode: 'cors', method: 'POST', headers })
    .then(response => response)
    .catch(_ => ({ status: 500 }));
};

export const createNewAccount = ({ email, name, surname, password, phone }) => {
  const body = JSON.stringify({
    email,
    name,
    surname,
    password,
    phone_number: phone,
  });
  return fetch(`${config.DOMAIN}/api/register`, { mode: 'cors', method: 'POST', body, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, })
    .then(response => response)
    .catch(_ => ({ status: 500 }));
};

export const fetchUserDetails = (id, token) => {
  const headers = { 'Authorization': `Basic ${btoa(token + ':unused')}` };
  const path = `${config.DOMAIN}/api/users/${id}`;
  return fetch(path, { mode: 'cors', method: 'GET', headers })
    .then(response => response)
};

export const fetchOrders = (id, page, token) => {
  const headers = { 'Authorization': `Basic ${btoa(token + ':unused')}` };
  const path = `${config.DOMAIN}/api/users/${id}/orders?page=${page}`;
  return fetch(path, { mode: 'cors', method: 'GET', headers })
    .then(response => response)
};

export const fetchOrder = (userId, orderId, token) => {
  const headers = { 'Authorization': `Basic ${btoa(token + ':unused')}` };
  const path = `${config.DOMAIN}/api/users/${userId}/orders/${orderId}`;
  return fetch(path, { mode: 'cors', method: 'GET', headers })
    .then(response => response)
};
