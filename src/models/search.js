import { message } from 'antd';
import queryString from 'query-string';
import { bool } from 'prop-types';
import select from 'eslint-plugin-jsx-a11y/src/util/implicitRoles/select';

const fetchBooks = queryString => {
  return fetch('https://bookstore-flask.herokuapp.com/api/books' + queryString,
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => ({ data, status: 200 }))
    .catch(_ => ({ status: 500 }));
};

const fetchAutocompleteOptions = ({ optionName, searchBy }) => {
  const domain = 'https://bookstore-flask.herokuapp.com';
  const path = `${domain}/api/${optionName}${searchBy !== '' ? '?' + optionName.slice(0, -1) + '=' : ''}${searchBy}`;  //eg /api/tags?tag=New, hence slice
  return fetch(path, { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })                  // no query string -> api returns all tags/genres etc
    .then(response => response);
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
      authors_names: false,
      publishers: false,
      tags: false,
    },
    options: {
      genres: [],
      authors_names: [],
      publishers: [],
      tags: [],
      price: [],
    },
    values: {
      genres: [],
      authors_names: [],
      publishers: [],
      tags: [],
      releaseDate: [],
      price: [],
      featured: false,
      available: true,
    },
    pricesRange: {
      min: 0,
      max: 100,
    },
  },
  reducers: {
    startQuery(state) {
      return { ...state, queryInProgress: true };
    },
    stopQuery(state) {
      return { ...state, queryInProgress: false };
    },
    updateBooks(state, { payload: books }) {
      return { ...state, dataSet: books };
    },
    clearDataSource(state) {
      return { ...state, dataSet: [] };
    },
    autocompleteOptionIsLoading(state, { payload: optionName }) {
      return { ...state, autocompleteLoading: { ...state.autocompleteLoading, ...{ [optionName]: true } } };
    },
    autocompleteOptionStoppedLoading(state, { payload: optionName }) {
      return { ...state, autocompleteLoading: { ...state.autocompleteLoading, ...{ [optionName]: false } } };
    },
    updateDataSet(state, { payload: dataSet }) {
      return { ...state, dataSet };
    },
    updateAutocompleteOption(state, { payload: { optionName, newOptions } }) {
      return { ...state, options: { ...state.options, ...{ [optionName]: newOptions } } };
    },
    updateAutocompleteOptions(state, { payload: options }) {
      return { ...state, options };
    },
    clearOption(state, { payload: optionName }) {
      return { ...state, options: { ...state.options, ...{ [optionName]: [] } } };
    },
    updateSingleValue(state, { payload: { optionName, newValues } }) {
      return { ...state, values: { ...state.values, ...{ [optionName]: newValues } } };
    },
    updateAllValues(state, { payload: values }) {
      return { ...state, values };
    },
    clearValues(state) {
      return {
        ...state, values: {
          genres: [],
          authors_names: [],
          publishers: [],
          tags: [],
          releaseDate: [],
          price: [],
          featured: false,
          available: true,
        },
      };
    },
  },
  effects: {
    * fetchBooks(action, { call, put }) {
      yield put({ type: 'startQuery' });
      const result = yield call(fetchBooks, action.payload);
      if (result.status === 200)
        yield put({ type: 'updateBooks', payload: result.data });
      else
        yield call(message.error, 'Error ' + result.status + ' :(', 1.5);
      yield put({ type: 'stopQuery' });
    },
    * getAutocompleteOptions(action, { call, put }) {
      yield put({ type: 'autocompleteOptionIsLoading', payload: action.payload.optionName });
      const result = yield call(fetchAutocompleteOptions, action.payload);
      switch (result.status) {
        case 200:
          let data = yield result.json();
          if (action.payload.optionName === 'tags')
            data = data.map(tag => tag.tag);
          else
            data = data.map(elem => elem.name);
          yield put({
            type: 'updateAutocompleteOption',
            payload: {
              optionName: action.payload.optionName,
              newOptions: data,
            },
          });
          break;
        default:
          yield call(message.error, 'Error', 1.5);
      }
      yield put({ type: 'autocompleteOptionStoppedLoading', payload: action.payload.optionName });
    },
    *parseQueryStringIntoValues(action, { put, select }) {
      let fromSearch = queryString.parse(action.payload);
      let values = yield select(({ search }) => search.values);
      Object.keys(fromSearch).forEach(key => {
        const value = fromSearch[key];
        values[key + 's'] = Array.isArray(value) ? value : [value]});
      yield put({ type: 'updateValues', payload: values });
    },
    *updateValue(action, { call, put, select }) {
      yield put({ type: 'updateSingleValue', payload: action.payload });
      const values = yield select(({ search }) => search.values);
      window.history.pushState(null, '',
        `search?${queryString.stringify(values)}`);
      //check if there might be more
      //filter if less
      //reset price slider
    },
    *updateValues(action, { call, put, select }) {
      yield put({ type: 'updateAllValues', payload: action.payload });
      const values = yield select(({ search }) => search.values);
      window.history.pushState(null, '',
        `search?${queryString.stringify(values)}`);
      //check if there might be more
      //filter if less
      //reset price slider
    },
  },
  subscriptions: {
    keepURLandFilterOptionsInSync({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/search') {
          dispatch({ type: 'clearValues' });
          dispatch({
            type: 'parseQueryStringIntoValues',
            payload: search,
          });
        }
      });
    },
  },
};
