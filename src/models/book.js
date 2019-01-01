import { message } from 'antd';

const getBook = id => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books/' + id.toString();
  return fetch(path, { method: 'GET', mode: 'cors'})
    .then(response => response)
};

export default {
  namespace: 'book',
  state: {
    book: null,
    loading: false,
  },
  reducers: {
    showLoading(state) {
      return { ...state,  loading: true };
    },
    stopLoading(state) {
      return { ...state, loading: false };
    },
    update(state, { payload: book }) {
      return { ...state, book }
    },
  },
  effects: {
    *fetchBook(action, { call, put, select }) {
      yield put({ type: 'showLoading' });
      let book = yield select(state => state.book.book);
      if (action.payload !== book.id) {
        const products = yield select(state => state.books.products);
        book = products.filter(book => book.id === action.payload)[0];
        if (book === null || book === undefined) {
          const result = yield call(getBook, action.payload);
          switch (result.status) {
            case 200:
              const data = yield result.json();
              yield put({ type: 'update', payload: data });
              break;
            default:
              yield call(message.error, 'Error :(', 1.5)
          }
        } else
          yield put({ type: 'update', payload: book });
      }
      yield put({ type: 'stopLoading' });
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
            payload: parseInt(matches[1], 10)
          })
        }
      });
    },
  },
};
