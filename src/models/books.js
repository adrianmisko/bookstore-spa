const fetchFeatured = () => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books?featured=true';
  return fetch(path, { mode: 'cors', method: 'get' })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
};

export default {
  namespace: 'books',
  state: {
    products: [],
    loading: false,
    itemsInCart: {},
    restartAnimation: false,
    firstLoad: true,
  },
  reducers: {
    update(state, { payload: products }) {
      return { ...state, products };
    },
    loadingOn(state) {
      return { ...state, loading: true };
    },
    loadingOff(state) {
      return { ...state, loading: false };
    },
    addItemToCart(state, { payload: id }) {
      return { ...state, itemsInCart: { ...state.itemsInCart, ...{ [id]: (state.itemsInCart[id] || 0) + 1 } } };
    },
    removeOneFromCart(state, { payload: id }) {
      return { ...state, itemsInCart: { ...state.itemsInCart, ...{ [id]: (state.itemsInCart[id] || 0) - 1 } } };
    },
    removeAllFromCart(state, { payload: id }) {
      return { ...state, itemsInCart: { ...state.itemsInCart, ...{ [id]: 0 } } };
    },
    clearCart(state) {
      return { ...state, itemsInCart: {} };
    },
    startBasketJump(state) {
      return { ...state, restartAnimation: true };
    },
    endBasketJump(state) {
      return { ...state, restartAnimation: false };
    },
    disableFirstLoad(state) {
      return { ...state, firstLoad: false };
    },
  },
  effects: {
    * fetchFeatured(action, { call, put }) {
      yield put({ type: 'loadingOn' });
      const result = yield call(fetchFeatured);
      yield put({ type: 'update', payload: result });
      yield put({ type: 'loadingOff' });
      yield put({ type: 'completeFetch' });
    },
    * addToCart(action, { call, put }) {
      yield put({ type: 'disableFirstLoad' });
      yield put({ type: 'startBasketJump' });
      yield put({ type: 'addItemToCart', payload: action.payload });
      yield new Promise((res, _) => setTimeout(res, 10));
      yield put({ type: 'endBasketJump' });
    },
  },
  subscriptions: {
    featured({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchFeatured' });
        }
      });
    },
  },
};
