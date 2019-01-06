import { message } from 'antd';

const fetchBooks = queryString => {
  return fetch('https://bookstore-flask.herokuapp.com/api/books' + queryString,
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => ({ data, status: 200 }))
    .catch(_ => ({ status: 500 }))
};

const fetchAutocompleteOptions = ({ optionName, searchBy }) => {
  const path = `https://bookstore-flask.herokuapp.com/api/${optionName}s${searchBy}`;
  return fetch(path, { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response)
};

export default {
  namespace: 'search',
  state: {
    dataSet: [],
    filtered: [],
    queryInProgress: false,
    filtering: false,
    autocompleteLoading: {
      genres: false,
      authors: false,
      publishers: false,
      tags: false,
    },
    options: {
      genres: [],
      authors: [],
      publishers: [],
      tags: [],
      price: []
    },
    values: {
      genres: [],
      authors: [],
      publishers: [],
      tags: [],
      releaseDate: [],
      price: [],
      featured: false,
      available: true
    },
    inMemory: {
      genres: [],
      authors: [],
      publishers: [],
      tags: [],
      releaseDate: [],
      price: [],
      featured: false,
      available: true
    },
    pricesRange: []
  },
  reducers: {
    startQuery(state) {
      return { ...state, queryInProgress: true }
    },
    stopQuery(state) {
      return { ...state, queryInProgress: false }
    },
    updateBooks(state, { payload: books }) {
      return { ...state, dataSet: books }
    },
    clearDataSource(state) {
      return { ...state, dataSet: [] }
    },
    autocompleteOptionIsLoading(state, { payload: optionName }) {
      return { ...state, autocompleteLoading: { ...state.autocompleteLoading, ...{ [optionName]: true } } }
    },
    autocompleteOptionStoppedLoading(state, { payload: optionName }) {
      return { ...state, autocompleteLoading: { ...state.autocompleteLoading, ...{ [optionName]: false } } }
    },
    updateDataSet(state, { payload: dataSet }) {
      return { ...state, dataSet }
    },
    updateAutocompleteOptions(state, { payload: { optionName, newOptions } }) {
      newOptions = newOptions.map(option => option.name);
      return { ...state, options: { ...state.options, ...{ [optionName]: newOptions } } }
    },
    clearOption(state, { payload: optionName }) {
      return { ...state, options: { ...state.options, ...{ [optionName]: [] } } }
    }
  },
  effects: {
    *fetchBooks(action, { call, put }) {
      yield put({ type: 'startQuery' });
      const result = yield call(fetchBooks, action.payload);
      if (result.status === 200)
        yield put({ type: 'updateBooks', payload: result.data });
      else
        yield call(message.error, 'Error ' + result.status + ' :(', 1.5);
      yield put({ type: 'stopQuery' });
    },
    *getAutocompleteOptions(action, { call, put }) {
      const optionName = action.payload.optionName + 's'; //this is not perfect but backend demands more REST purity
      yield put({ type: 'autocompleteOptionIsLoading', payload: optionName });
      const result = yield call(fetchAutocompleteOptions, action.payload);
      switch (result.status) {
        case 200:
          const data = yield result.json();
          yield put({
            type: 'updateAutocompleteOptions',
            payload: {
              optionName: optionName,
              newOptions: data
            }
          });
          break;
        default:
          yield call(message.error, 'Error', 1.5);
      }
      yield put({ type: 'autocompleteOptionStoppedLoading', payload: optionName });
    },
  },
  subscriptions: {},
}
