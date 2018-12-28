import {message} from 'antd';

const validateCredentials = ({ userName, password, put }) => {
  const headers = { 'Authorization': `Basic ${btoa(userName + ':' + password)}` };
  return fetch('http://127.0.0.1:5000/api/token', { mode: 'cors', method: 'POST', headers: headers })
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
      return ({ errorMessage: '' })
    }
  },
  effects: {
    *submitLoginForm(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(validateCredentials, action.payload, put);
      yield put({ type: 'hideLoading' });
      if (result.status === 200) {
        const token = yield result.json();
        yield put({ type: 'saveToken', payload: token });
        yield put({ type: 'logUserIn' });
        yield put({ type: 'ui/hideLoginModal' });
        yield call(message.success, 'Welcome!', 1.2);
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
    *logOut(action, { call, put }) {
      yield put({ type: 'resetState' });
      yield call(message.success, 'You\'be been successfully logged out', 1.5);
      yield call(window.sessionStorage.clear());
    },
  }
}
