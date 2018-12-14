import { Redirect } from 'umi/redirect';

function fetchBooks() {
  const domain = 'my.api.mockaroo.com';
  const headers = { "X-API-KEY" : "5b7c8e10" };
  return fetch(`https://cors-anywhere.herokuapp.com/http://${domain}/books`, { headers, mode: 'cors', method:'get' })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
}

export default {
  namespace: 'books',
  state: { products: [], loading: false },
  reducers: {
      search(state, { payload: queryString }) {
      return { ...state };
    },
    update(state, { payload: products }) {
      return { ...state, products };
    },
    loadingOn(state) {
      console.log({ ...state, loading: true });
      return { ...state, loading: true };
    },
    loadingOff(state) {
      return { ...state, loading: false }
    }
  },
  effects: {
    *fetchBooks(action, { call, put }) {
      yield put({ type: 'loadingOn'});
      const result = yield call(fetchBooks);
      yield put({ type: 'update', payload: result });
      yield put({ type: 'loadingOff'})
    },
  },
  subscriptions: {
    featured({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchBooks' });
        }
      });
    },
  },
};
