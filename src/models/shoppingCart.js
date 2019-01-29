export default {
  namespace: 'shoppingCart',
  state: {
    itemsInCart: {},
    restartAnimation: false,
    firstLoad: true,
  },
 reducers: {
    addItemToCart(state, { payload: book }) {
      let item = state.itemsInCart[book.id];
      if (!item)
        item = ({ ...book, quantity: 0 });
      item.quantity++;
      return { ...state, itemsInCart: { ...state.itemsInCart, [item.id]: item } };
    },
    removeOneFromCart(state, { payload: id }) {
      let item = state.itemsInCart[id];
      item.quantity--;
      let itemsInCart;
      if (item.quantity === 0)
        delete item.id;
      else
        itemsInCart = { ...state.itemsInCart, [id]: item };
      return { ...state, itemsInCart };
    },
    removeAllFromCart(state, { payload: id }) {
      let itemsInCart = state.itemsInCart;
      delete itemsInCart[id];
      return { ...state, itemsInCart };
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
    * add(action, { call, put }) {
      yield put({ type: 'disableFirstLoad' });
      yield put({ type: 'startBasketJump' });
      yield put({ type: 'addItemToCart', payload: action.payload });
      yield new Promise((res, _) => setTimeout(res, 10));
      yield put({ type: 'endBasketJump' });
    },
  },
  subscriptions: {}
};
