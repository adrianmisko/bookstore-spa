import { message } from 'antd';

const fetchDeliveryMethods = () => {
  return fetch('https://bookstore-flask.herokuapp.com/api/delivery_methods',
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5));
};

const fetchPaymentMethods = () => {
  return fetch('https://bookstore-flask.herokuapp.com/api/payment_methods',
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5));
};

const makeOrder = (postDataJSON, userId) => {
  const path = `https://bookstore-flask.herokuapp.com/api/users/${userId}/orders`;
  return fetch(path, {
    mode: 'cors', method: 'POST', body: postDataJSON, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response)
};

export default {
  namespace: 'order',
  state: {
    items: [],
    location: {
      place: '',
      streetName: '',
      streetNumber: '',
      flatNumber: '',
      zipCode: '',
    },
    deliveryMethod: null,
    deliveryMethodOptions: [],
    paymentMethod: null,
    paymentMethodOptions: [],
    resolving: false,
    orderMadeSuccessfully: undefined,
    errors: {},
    fakeProgress: 0
  },
  reducers: {
    saveLocation(state, { payload: location }) {
      return { ...state, location };
    },
    saveDeliveryMethod(state, { payload: deliveryMethod }) {
      return { ...state, deliveryMethod };
    },
    updateDeliveryMethodOptions(state, { payload: deliveryMethodOptions }) {
      return { ...state, deliveryMethodOptions };
    },
    updatePaymentMethodOptions(state, { payload: paymentMethodOptions }) {
      return { ...state, paymentMethodOptions };
    },
    savePaymentMethod(state, { payload: paymentMethod }) {
      return { ...state, paymentMethod };
    },
    freezeItems(state, { payload: items }) {
      return { ...state, items };
    },
    startResolving(state) {
      return { ...state, resolving: true };
    },
    stopResolving(state) {
      return { ...state, resolving: false };
    },
    orderSuccess(state) {
      return { ...state, orderMadeSuccessfully: true };
    },
    orderFailure(state) {
      return { ...state, orderMadeSuccessfully: false };
    },
    bumpProgressToMax(state) {
      return { ...state, fakeProgress: 100 }
    },
    increaseFakeProgress(state) {
      return { ...state, fakeProgress: state.fakeProgress + 2 }
    },
    resetFakeProgress(state) {
      return { ...state, fakeProgress: 0 }
    },
    clearData(state) {
      return {
        items: [],
        location: {
          place: '',
          streetName: '',
          streetNumber: '',
          flatNumber: '',
          zipCode: '',
        },
        deliveryMethod: '',
        deliveryMethodOptions: [],
        paymentMethod: '',
        paymentMethodOptions: [],
        resolving: false,
        orderMadeSuccessfully: undefined,
        errors: {},
        fakeProgress: 0
      }
    }
  },
  effects: {
    * fetchDeliveryMethodOptions(action, { call, put }) {
      const result = yield call(fetchDeliveryMethods);
      yield put({ type: 'updateDeliveryMethodOptions', payload: result });
    },
    * fetchPaymentMethodOptions(action, { call, put }) {
      const result = yield call(fetchPaymentMethods);
      yield put({ type: 'updatePaymentMethodOptions', payload: result });
    },
    * makeOrder(action, { call, put, select }) {
      yield put({ type: 'startResolving' });
      const user = yield select(({ user }) => user);
      const postData = yield select(({ order }) => ({
        location: {
          place: order.location.place,
          street_name: order.location.streetName,
          street_number: order.location.streetNumber,
          flat_number: order.location.flatNumber,
          zip_code: order.location.zipCode,
        },
        delivery_method: order.deliveryMethod.name,
        payment_method: order.paymentMethod.name,
        items: order.items.map(item => ({ id: item.id, quantity: item.quantity })),
      }));
      const postDataJSON = JSON.stringify(postData);
      const result = yield call(makeOrder, postDataJSON, user.userId);
      switch (result.status) {
        case 201:
          yield put({ type: 'orderSuccess' });
          yield put({ type: 'bumpProgressToMax' });
          yield put({ type: 'books/clearCart' });
          yield put({ type: 'ui/changeTab', payload: 'tab2' });
          break;
        default:
          yield put({ type: 'orderFailure' })
      }
      yield put({ type: 'stopResolving' });
    },
  },
  subscriptions: {},
};
