import { message } from 'antd';
import { queryServer } from '../services/searchBar';

export default {
  namespace: 'searchBar',
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
