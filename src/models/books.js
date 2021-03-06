import { fetchBooks, fetchFeatured } from '../services/book';

export default {
  namespace: 'books',
  state: {
    featured: [],
    products: [],
    loading: false,
  },
  reducers: {
    updateFeatured(state, { payload: featured }) {
      return { ...state, featured };
    },
    updateProducts(state, { payload: products }) {
      return { ...state, products };
    },
    loadingOn(state) {
      return { ...state, loading: true };
    },
    loadingOff(state) {
      return { ...state, loading: false };
    },
  },
  effects: {
    * fetchFeatured(action, { call, put }) {
      yield put({ type: 'loadingOn' });
      const result = yield call(fetchFeatured);
      yield put({ type: 'updateFeatured', payload: result });
      yield put({ type: 'loadingOff' });
      yield put({ type: 'completeFetch' });
    },
    * fetchBooks(action, { call, put }) {
      yield put({ type: 'loadingOn' });
      const result = yield call(fetchBooks);
      yield put({ type: 'updateProducts', payload: result });
      yield put({ type: 'loadingOff' });
      yield put({ type: 'completeFetch' });
    }
  },
  subscriptions: {
    frontPage({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchFeatured' });
          dispatch({ type: 'fetchBooks' });
        }
      });
    },
  },
};
