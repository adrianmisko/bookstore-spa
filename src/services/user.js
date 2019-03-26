export const validateCredentials = ({ userName, password }) => {
  const headers = { 'Authorization': `Basic ${btoa(userName + ':' + password)}` };
  return fetch('https://bookstore-flask.herokuapp.com/api/token', { mode: 'cors', method: 'POST', headers: headers })
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
  return fetch('https://bookstore-flask.herokuapp.com/api/register', { mode: 'cors', method: 'POST', body, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, })
    .then(response => response)
    .catch(_ => ({ status: 500 }));
};

export const fetchUserDetails = id => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${id}`;
  return fetch(path, { mode: 'cors', method: 'GET' })
    .then(response => response)
};

export const fetchOrders = (id, page) => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${id}/orders?page=${page}`;
  return fetch(path, { mode: 'cors', method: 'GET' })
    .then(response => response)
};

export const fetchOrder = (userId, orderId) => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${userId}/orders/${orderId}`;
  return fetch(path, { mode: 'cors', method: 'GET' })
    .then(response => response)
};
