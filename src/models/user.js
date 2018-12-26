const validateCredentials = ({ userName, password }) => {
  const headers = { 'Authorization': `Basic ${btoa(userName + ':' + password)}` };
  return fetch('http://127.0.0.1:5000/api/token', { mode: 'cors', headers: headers })
    .then(response => response)
    .catch(error => console.log(error));
};

export default {
  namespace: 'user',
  state: {
    isLoading: false,
    isLoggedIn: false,
    token: '',
    errorMessage: ''
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
    logUserOut(state) {
      return { ...state, isLoggedIn: false }
    },
    showErrorNotification(state) {
      return { state, errorMessage: 'Invalid credentials' }
    },
    hideErrorNotification(state) {
      return { state, errorMessage: '' }
    }
  },
  effects: {
    *submitLoginForm(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(validateCredentials, action.payload);
      if (result.status === 200) {
        const token = yield result.json();
        yield put({ type: 'saveToken', payload: token });
        yield put({ type: 'logUserIn' });
        yield put({ type: 'ui/hideLoginModal' });
      } else {
        yield put({ type: 'showErrorNotification' });
        console.log('error, http response code: ' + result.status)
      }
      yield put({ type: 'hideLoading' });
    },
  }
}
