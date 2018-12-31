import { message } from 'antd';

const validateCredentials = ({ userName, password }) => {
  const headers = { 'Authorization': `Basic ${btoa(userName + ':' + password)}` };
  return fetch('https://bookstore-flask.herokuapp.com/api/token', { mode: 'cors', method: 'POST', headers: headers })
    .then(response => response)
    .catch(_ => ({ status: 500 }));
};

const createNewAccount = ({ email, password, phone }) => {
  const body = JSON.stringify({
    email,
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

export default {
  namespace: 'user',
  state: {
    isLoading: false,
    isLoggedIn: false,
    token: '',
    errorMessage: '',
  },
  reducers: {
    showLoading(state) {
      return { ...state, isLoading: true}
    },
    hideLoading(state) {
      return { ...state, isLoading: false }
    },
    saveToken(state, { payload: token }) {
      return { ...state, token }
    },
    logUserIn(state) {
      return { ...state, isLoggedIn: true }
    },
    showErrorNotification(state, { payload: message }) {
      return { ...state, errorMessage: message }
    },
    hideErrorNotification(state) {
      return { ...state, errorMessage: '' }
    },
    resetState() {
      return { errorMessage: '', isLoading: false, isLoggedIn: false, token: ''  }
    },
  },
  effects: {
    *submitLoginForm(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(validateCredentials, action.payload.values, put);
      yield put({ type: 'hideLoading' });
      if (result.status === 200) {
        const token = yield result.json();
        yield put({ type: 'saveToken', payload: token });
        yield put({ type: 'logUserIn' });
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
          break;
        default:
          yield call(message.error, 'Error :(', 2);
      }
    },
    *logOut(action, { call, put }) {
      yield put({ type: 'resetState' });
      yield call(message.success, 'You\'be been successfully logged out', 1.5);
      yield call(window.sessionStorage.clear());
    },
  }
}
