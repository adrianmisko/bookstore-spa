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
  state: {
    products: [],
    loading: false,
    items: [],
    alreadyFetched: false,
  },
  reducers: {
    search(state, { payload: queryString }) {
      return { ...state };
    },
    update(state, { payload: products }) {
      return { ...state, products };
    },
    loadingOn(state) {
      return { ...state, loading: true };
    },
    loadingOff(state) {
      return { ...state, loading: false }
    },
    completeFetch(state) {
      return { ...state, alreadyFetched: true }
    },
    addToCart(state, { payload: book }) {
      return { ...state, items: [ ...state.items, book ] }
    },
  },
  effects: {
    *fetchBooks(action, { call, put, select }) {
      const alreadyFetched = yield select(state => state.books.alreadyFetched);
      if (! alreadyFetched) {
        console.log('start');
        yield put({ type: 'loadingOn'});
        const result = yield call(fetchBooks);
        yield put({ type: 'update', payload: result });
        yield put({ type: 'loadingOff'});
        yield put({ type: 'completeFetch'});
      } else {
        ;
      }
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
