import { message } from 'antd';

const validateCredentials = ({ userName, password }) => {
  const headers = { 'Authorization': `Basic ${btoa(userName + ':' + password)}` };
  return fetch('https://bookstore-flask.herokuapp.com/api/token', { mode: 'cors', method: 'POST', headers: headers })
    .then(response => response)
    .catch(_ => ({ status: 500 }));
};

const createNewAccount = ({ email, name, surname, password, phone }) => {
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

const fetchUserDetails = id => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${id}`;
  return fetch(path, { mode: 'cors', method: 'GET' })
    .then(response => response)
};

const fetchOrders = (id, page) => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${id}/orders?page=${page}`;
  return fetch(path, { mode: 'cors', method: 'GET' })
    .then(response => response)
};

const fetchOrder = (userId, orderId) => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${userId}/orders/${orderId}`;
  return fetch(path, { mode: 'cors', method: 'GET' })
    .then(response => response)
};

export default {
  namespace: 'user',
  state: {
    isLoading: false,
    isLoggedIn: false,
    token: '',
    errorMessage: '',
    name: '',
    surname: '',
    userId: '',
    userDetails: {}, //some of data repeats, but object is more convenient
    locationTabIdx: '0',  //key has to be a string
    orders: [],
    pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
    },
    order: {}
  },
  reducers: {
    showLoading(state) {
      return { ...state, isLoading: true}
    },
    hideLoading(state) {
      return { ...state, isLoading: false }
    },
    logUserIn(state, { payload: userData }) {
      return { ...state, isLoggedIn: true, userId: userData.id, name: userData.name,
        surname: userData.surname, token: userData.token }
    },
    showErrorNotification(state, { payload: message }) {
      return { ...state, errorMessage: message }
    },
    hideErrorNotification(state) {
      return { ...state, errorMessage: '' }
    },
    resetState(state) {
      return {
        isLoading: false,
        isLoggedIn: false,
        token: '',
        errorMessage: '',
        name: '',
        surname: '',
        userId: '',
        userDetails: {},
        locationTabIdx: '0',
        orders: [],
        pagination: {
          total: 0,
          pageSize: 10,
          current: 1,
        },
        order: {}
      }
    },
    updateUserDetails(state, { payload: userDetails }) {
      return { ...state, userDetails }
    },
    changeLocationTab(state, { payload: key }) {
      return { ...state, locationTabIdx: key }
    },
    updateOrders(state, { payload: orders }) {
      return { ...state, orders }
    },
    updateOrder(state, { payload: order }) {
      return { ...state, order }
    },
    updateTotal(state, { payload: total }) {
      return { ...state, pagination: { ...state.pagination, total } }
    },
    updateCurrentPage(state, { payload: current }) {
      return { ...state, pagination: { ...state.pagination, current } }
    }
  },
  effects: {
    *changePage(action, { call, put }) {
      yield put({ type: 'updateCurrentPage', payload: action.payload });
      yield put({ type: 'getOrders' });
    },
    *submitLoginForm(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(validateCredentials, action.payload.values);
      yield put({ type: 'hideLoading' });
      if (result.status === 200) {
        const userData = yield result.json();
        yield put({ type: 'logUserIn', payload: userData });
        yield put({ type: 'ui/hideLoginModal' });
        yield call(message.success, 'Welcome!', 1.2);
        yield call(action.payload.form.resetFields);
      } else {
        switch (result.status) {
          case 500:
            yield put({ type: 'showErrorNotification', payload: 'Internal server error' });
            break;
          case 401:
            yield put({ type: 'showErrorNotification', payload: 'Invalid credentials' });
            break;
          default:
            yield put({ type: 'showErrorNotification', payload: 'Error' });
        }
      }
    },
    *submitRegistrationForm(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(createNewAccount, action.payload.values);
      yield put({ type: 'hideLoading' });
      switch (result.status) {
        case 500:
          yield call(message.error, 'Internal server error :(', 2);
          break;
        case 201:
          yield call(message.success, 'Your account has been successfully created', 2);
          yield put({ type: 'ui/hideRegisterDrawer' });
          yield call(action.payload.form.resetFields);
          yield put({
            type: 'submitLoginForm',
            payload: {
              values: {
                userName: action.payload.values.email,
                password: action.payload.values.password
              }
            }
          });
          break;
        default:
          yield call(message.error, 'Error :(', 2);
      }
    },
    *logOut(action, { call, put }) {
      yield put({ type: 'resetState' });
      yield call(message.success, 'You\'be been successfully logged out', 1.5);
      yield call(window.sessionStorage.clear);
    },
    *fetchUserDetails(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(fetchUserDetails, action.payload);
      switch (result.status) {
        case 200:
          const userDetails = yield result.json();
          yield put({ type: 'updateUserDetails', payload: userDetails });
          break;
        default:
          yield call(message.error, 'Error :(', 1.5)
      }
      yield put({ type: 'hideLoading' });
    },
    *getOrders(action, { call, put, select }) {
      yield put({ type: 'showLoading' });
      let id = action.payload;
      if (!id)
        id = yield select(({ user }) => user.userId);
      const page = yield select(({ user }) => user.pagination.current);
      const result = yield call(fetchOrders, id, page);
      switch (result.status) {
        case 200:
          const data = yield result.json();
          yield put({ type: 'updateOrders', payload: data.data });
          yield put({ type: 'updateTotal', payload: data.total });
          break;
        default:
          yield call(message.error, 'Error :(', 1.5)
      }
      yield put({ type: 'hideLoading' });
    },
    *getOrderDetails(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(fetchOrder, action.payload.userId, action.payload.orderId);
      switch (result.status) {
        case 200:
          const data = yield result.json();
          yield put({ type: 'updateOrder', payload: data });
          break;
        default:
          yield call(message.error, 'Error :(', 1.5)
      }
      yield put({ type: 'hideLoading' });
    },
  },
  subscriptions: {
    getDetails({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const pathToRegexp = require('path-to-regexp');
        const re = pathToRegexp('/users/:id');
        const matches = re.exec(pathname);
        if (matches !== null) {
          dispatch({
            type: 'fetchUserDetails',
            payload: parseInt(matches[1], 10),
          });
          dispatch({
            type: 'getOrders',
            payload: parseInt(matches[1], 10),
          });
        }
      });
    },
    getOrderDetails({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const pathToRegexp = require('path-to-regexp');
        const re = pathToRegexp('/users/:id/orders/:id');
        const matches = re.exec(pathname);
        if (matches !== null) {
          dispatch({
            type: 'getOrderDetails',
            payload: {
              userId: parseInt(matches[1], 10),
              orderId: parseInt(matches[2], 10)
            }
          });
        }
      });
    },
  },
}
