import { message } from 'antd';
import { getBook, getReviews, upvoteReview,
  downvoteReview, cancelDownvote, cancelUpvote, postReview
} from '../services/book';


export default {
  namespace: 'book',
  state: {
    book: null,
    loading: false,
    reviews: [],
    loadingReviews: false,
    reviewIsBeingSend: false,
    liked: [],
    disliked: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    }
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
      return { ...state, reviewIsBeingSend: true };
    },
    stopSendingReview(state) {
      return { ...state, reviewIsBeingSend: false };
    },
    appendReview(state, { payload: review }) {
      return { ...state, reviews: [...state.reviews, review] };
    },
    incUpvoteCount(state, { payload: id }) {
      const reviewIdx = state.reviews.findIndex(item => item.id === id);
      const review = state.reviews[reviewIdx];
      review.upvotes = review.upvotes + 1;
      return {
        ...state,
        reviews: [...state.reviews.slice(0, reviewIdx), review, ...state.reviews.slice(reviewIdx + 1)],
      };
    },
    incDownvoteCount(state, { payload: id }) {
      const reviewIdx = state.reviews.findIndex(item => item.id === id);
      const review = state.reviews[reviewIdx];
      review.downvotes = review.downvotes + 1;
      return {
        ...state,
        reviews: [...state.reviews.slice(0, reviewIdx), review, ...state.reviews.slice(reviewIdx + 1)],
      };
    },
    decUpvoteCount(state, { payload: id }) {
      const reviewIdx = state.reviews.findIndex(item => item.id === id);
      const review = state.reviews[reviewIdx];
      review.upvotes = review.upvotes - 1;
      return {
        ...state,
        reviews: [...state.reviews.slice(0, reviewIdx), review, ...state.reviews.slice(reviewIdx + 1)],
      };
    },
    decDownvoteCount(state, { payload: id }) {
      const reviewIdx = state.reviews.findIndex(item => item.id === id);
      const review = state.reviews[reviewIdx];
      review.downvotes = review.downvotes - 1;
      return {
        ...state,
        reviews: [...state.reviews.slice(0, reviewIdx), review, ...state.reviews.slice(reviewIdx + 1)],
      };
    },
    markAsLiked(state, { payload: id }) {
      return { ...state, liked: [...state.liked, id] };
    },
    markAsDisliked(state, { payload: id }) {
      return { ...state, disliked: [...state.disliked, id] };
    },
    undoMarkAsLiked(state, { payload: id }) {
      return { ...state, liked: state.liked.filter(item => item !== id) };
    },
    undoMarkAsDisliked(state, { payload: id }) {
      return { ...state, disliked: state.disliked.filter(item => item !== id) };
    },
    updateTotal(state, { payload: total }) {
      return { ...state, pagination: { ...state.pagination, total } }
    },
    updateCurrentPage(state, { payload: current }) {
      return { ...state, pagination: { ...state.pagination, current } }
    }
  },
  effects: {
    * fetchBook(action, { call, put }) {
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
    * changePage(action, { call, put }) {
      yield put({ type: 'updateCurrentPage', payload: action.payload });
      yield put({ type: 'fetchReviews', payload: action.payload });
    },
    * fetchReviews(action, { call, put, select }) {
      if (!action.payload.key || action.payload.key.length) {
        yield put({ type: 'showLoadingReviews' });
        const page = yield select(({ book }) => book.pagination.current);
        console.log(page);
        let id = action.payload.id;
        console.log(id);
        if (!id)
          id = yield select(({ book }) => book.book.id);
        console.log(id);
        const result = yield call(getReviews, id, page);
        switch (result.status) {
          case 200:
            const data = yield result.json();
            yield put({ type: 'updateTotal', payload: data.total });
            yield put({ type: 'updateReviews', payload: data.data });
            break;
          default:
            yield call(message.error, 'Error :(', 1.5);
            break;
        }
        yield put({ type: 'hideLoadingReviews' });
      }
    },
    * sendReview(action, { call, put }) {
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
    },
    * upvoteReview(action, { call, put, select }) {
      let shouldCancel = false;
      const liked = yield select(({ book }) => book.liked);
      const disliked = yield select(({ book }) => book.disliked);
      if (!liked.includes(action.payload)) {
        yield put({ type: 'incUpvoteCount', payload: action.payload });
        yield put({ type: 'markAsLiked', payload: action.payload });
        if (disliked.includes(action.payload)) {
          shouldCancel = true;
          yield put({ type: 'undoMarkAsDisliked', payload: action.payload });
          yield put({ type: 'decDownvoteCount', payload: action.payload });
        }
        yield call(upvoteReview, action.payload);
        if (shouldCancel) yield call(cancelDownvote, action.payload);
      }
    },
    * downvoteReview(action, { call, put, select }) {
      let shouldCancel = false;
      const liked = yield select(({ book }) => book.liked);
      const disliked = yield select(({ book }) => book.disliked);
      if (!disliked.includes(action.payload)) {
        yield put({ type: 'incDownvoteCount', payload: action.payload });
        yield put({ type: 'markAsDisliked', payload: action.payload });
        if (liked.includes(action.payload)) {
          shouldCancel = true;
          yield put({ type: 'undoMarkAsLiked', payload: action.payload });
          yield put({ type: 'decUpvoteCount', payload: action.payload });
        }
        yield call(downvoteReview, action.payload);
        if (shouldCancel) yield call(cancelUpvote, action.payload);
      }
    },
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
