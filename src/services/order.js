import { message } from 'antd';

export const fetchDeliveryMethods = () => {
  return fetch('https://bookstore-flask.herokuapp.com/api/delivery_methods',
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5));
};

export const fetchPaymentMethods = () => {
  return fetch('https://bookstore-flask.herokuapp.com/api/payment_methods',
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5));
};

export const makeOrder = (postDataJSON, userId, token) => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${userId}/orders`;
  return fetch(path, {
    mode: 'cors', method: 'POST', body: postDataJSON, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(token + ':unused')}`
    },
  })
    .then(response => response)
};
