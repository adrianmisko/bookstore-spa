const getBook = id => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books/' + id.toString();
  return fetch(path, { method: 'GET', mode: 'cors'})
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
};

export default {
  namespace: 'book',
  state: { book: {}, loading: false },
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
    *fetchBook(action, { call, put }) {
      yield put({ type: 'showLoading' });
      const result = yield call(getBook, action.payload);
      yield put({ type: 'update', payload: result });
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
