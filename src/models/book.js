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


const postReview = (id, {author, body, mark }) => {
  const postRequestBody = JSON.stringify({
    author,
    body,
    mark: mark * 2,
  });  console.log(postRequestBody);

  return fetch('https://bookstore-flask.herokuapp.com/api/books/' + id.toString() + '/reviews', {
    mode: 'cors', method: 'POST', body: postRequestBody, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response);
};

export default {
  namespace: 'book',
  state: {
    book: null,
    loading: false,
    reviews: [],
    loadingReviews: false,
    reviewIsBeingSend: false,
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
      return { ...state, loadingReviews: true };
    },
    hideLoadingReviews(state) {
      return { ...state, loadingReviews: false };
    },
    updateReviews(state, { payload: reviews }) {
      return { ...state, reviews };
    },
    startSendingReview(state) {
      return { ...state, reviewIsBeingSend: true}
    },
    stopSendingReview(state) {
      return { ...state, reviewIsBeingSend: false }
    },
    appendReview(state, { payload: review }) {
      return { ...state, reviews: [...state.reviews, review] }
    },
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
    },
    *sendReview(action, { call, put }) {
      yield put({ type: 'startSendingReview' });
      const result = yield call(postReview, action.payload.id, action.payload.values);
      yield put({ type: 'stopSendingReview' });
      switch (result.status) {
        case 201:
          const data = yield result.json();
          yield put({ type: 'appendReview', payload: data });
          yield call(action.payload.form.resetFields);
          yield call(message.success, 'Your review has been added', 1.5);
          break;
        default:
          yield call(message.error, 'Error :(', 1.5);
          break;
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
