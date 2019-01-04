import { message } from 'antd';

const getBook = id => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books/' + id.toString();
  return fetch(path, { method: 'GET', mode: 'cors' })
    .then(response => response);
};

const getReviews = id => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books/' + id.toString() + '/reviews';
  return fetch(path, { method: 'GET', mode: 'cors' })
    .then(response => response);
};


export default {
  namespace: 'book',
  state: {
    book: null,
    loading: false,
    reviews: [],
    loadingReviews: false
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    stopLoading(state) {
      return { ...state, loading: false };
    },
    update(state, { payload: book }) {
      return { ...state, book };
    },
    showLoadingReviews(state) {
      return { ...state, loadingReviews: true }
    },
    hideLoadingReviews(state) {
      return { ...state, loadingReviews: false }
    },
    updateReviews(state, { payload: reviews }) {
      return { ...state, reviews }
    }
  },
  effects: {
    *fetchBook(action, { call, put }) {
      yield put({ type: 'update', payload: null });
      yield put({ type: 'showLoading' });
      const result = yield call(getBook, action.payload);
      switch (result.status) {
        case 200:
          const data = yield result.json();
          yield put({ type: 'update', payload: data });
          break;
        default:
          yield call(message.error, 'Error :(', 1.5);
      }
      yield put({ type: 'stopLoading' });
    },
    *fetchReviews(action, { call, put }) {
      if (action.payload.key.length) {
        yield put({ type: 'showLoadingReviews' });
        const result = yield call(getReviews, action.payload.id);
        switch (result.status) {
          case 200:
            const data = yield result.json();
            yield put({ type: 'updateReviews', payload: data });
            break;
          default:
            yield call(message.error, 'Error :(', 1.5);
            break;
        }
        yield put({ type: 'hideLoadingReviews' });
      }
    }
  },
  subscriptions: {
    getDetails({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const pathToRegexp = require('path-to-regexp');
        const re = pathToRegexp('/books/:id');
        const matches = re.exec(pathname);
        if (matches !== null) {
          dispatch({
            type: 'fetchBook',
            payload: parseInt(matches[1], 10),
          });
        }
      });
    },
  },
};
