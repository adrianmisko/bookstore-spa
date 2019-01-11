import { message } from 'antd';
import queryString from 'query-string';


const fetchBooks = queryString => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books' + queryString;
  return fetch(path,
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

const updateQueryString = values => {
  let toQueryString = {};
  Object.keys(values).forEach(key => {
    if (Array.isArray(values[key]) && key !== 'price')
      toQueryString[key.slice(0, -1)] = values[key];
    else
      toQueryString[key] = values[key];
  });
  window.history.pushState(null, '',
    `search?${queryString.stringify(toQueryString)}`);
};

export default {
  namespace: 'search',
  state: {
    dataSet: [],
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
    clearDataSource(state) {
      return { ...state, dataSet: [] };
    },
    autocompleteOptionIsLoading(state, { payload: optionName }) {
      return { ...state, autocompleteLoading: { ...state.autocompleteLoading, ...{ [optionName]: true } } };
    },
    autocompleteOptionStoppedLoading(state, { payload: optionName }) {
      return { ...state, autocompleteLoading: { ...state.autocompleteLoading, ...{ [optionName]: false } } };
    },
    updateDataSet(state, { payload:  { dataSet: data } }) {
      return { ...state, dataSet: data };
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
    updateValue(state, { payload: { optionName, newValues } }) {
      return { ...state, values: { ...state.values, ...{ [optionName]: newValues } } };
    },
    updateValues(state, { payload: values }) {
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
    *parseQueryStringIntoValues(action, { put, call, select }) {
      let fromSearch = queryString.parse(action.payload);
      let values = yield select(({ search }) => search.values);
      Object.keys(fromSearch).forEach(key => {
        if (Array.isArray(values[key + 's']))
          values[key + 's'] = Array.isArray(fromSearch[key]) ? fromSearch[key] : [fromSearch[key]];
        else
          if (! Array.isArray(values[key]))
            values[key] = fromSearch[key] === 'true';
      });
      yield put({ type: 'updateValues', payload: values });
    },
    *search(action, { put, call, select }) {
      yield put({ type: 'startQuery' });
      const values = yield select(({ search }) => search.values);
      yield call(updateQueryString, values);
      const result = yield call(fetchBooks, window.location.search);
      switch(result.status) {
        case 200:
          yield put({ type: 'updateDataSet', payload: { dataSet: result.data } });
          break;
        default:
          yield call(message.error, 'Error :(', 1.5);
      }
      yield put({ type: 'stopQuery' });
    }
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
          dispatch({
            type: 'search',
            payload: window.location.search
          });
        }
      });
    },
  },
};
