import { message } from 'antd';

const queryServer = value => {
  return fetch('https://bookstore-flask.herokuapp.com/api/books?search=' + value,
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => ({ data, status: 200 }))
    .catch(_ => ({ status: 500 }))
};


export default {
  namespace: 'search',
  state: {
    booksFound: [],
    queryInProgress: false,
  },
  reducers: {
    startQuery(state) {
      return { ...state, queryInProgress: true }
    },
    stopQuery(state) {
      return { ...state, queryInProgress: false }
    },
    updateBooks(state, { payload: books }) {
      return { ...state, booksFound: books }
    },
    clearDataSource(state) {
      return { ...state, booksFound: [] }
    }
  },
  effects: {
    *searchForBooks(action, { call, put }) {
      yield put({ type: 'startQuery' });
      const result = yield call(queryServer, action.payload);
      if (result.status === 200)
        yield put({ type: 'updateBooks', payload: result.data });
      else
        yield call(message.error, 'Error ' + result.status + ' :(', 1.5);
      yield put({ type: 'stopQuery' });
    }
  },
  subscriptions: {},
}
