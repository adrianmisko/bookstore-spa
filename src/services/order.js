import { message } from 'antd';
import config from '../config';

export const fetchDeliveryMethods = () => {
  return fetch(`${config.DOMAIN}/api/delivery_methods`,
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5));
};

export const fetchPaymentMethods = () => {
  return fetch(`${config.DOMAIN}/api/payment_methods`,
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5));
};

export const makeOrder = (postDataJSON, userId, token) => {
  const path = `${config.DOMAIN}/api/users/${userId}/orders`;
  return fetch(path, {
    mode: 'cors', method: 'POST', body: postDataJSON, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(token + ':unused')}`
    },
  })
    .then(response => response)
};
