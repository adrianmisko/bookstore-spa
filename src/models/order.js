import { message } from 'antd';

const fetchDeliveryMethods = () => {
  return fetch('https://bookstore-flask.herokuapp.com/api/delivery_methods',
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' }})
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5))
};

const fetchPaymentMethods = () => {
  return fetch('https://bookstore-flask.herokuapp.com/api/payment_methods',
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' }})
    .then(response => response.json())
    .then(data => data)
    .catch(_ => message.error('Error :(', 1.5))
};

export default {
  namespace: 'order',
  state: {
    isLoading: false,
    location: {
      place: '',
      streetName: '',
      streetNumber: '',
      flatNumber: '',
      zipCode: ''
    },
    deliveryMethod: null,
    deliveryMethodOptions: [],
    paymentMethod: null,
    paymentMethodOptions: [],
  },
  reducers: {
    saveLocation(state, { payload: location }) {
      return { ...state, location }
    },
    saveDeliveryMethod(state, { payload: deliveryMethod }) {
      return { ...state, deliveryMethod }
    },
    updateDeliveryMethodOptions(state, { payload: deliveryMethodOptions }) {
      return { ...state, deliveryMethodOptions }
    },
    updatePaymentMethodOptions(state, { payload: paymentMethodOptions }) {
      return { ...state, paymentMethodOptions }
    },
    savePaymentMethod(state, { payload: paymentMethod }) {
      return { ...state, paymentMethod }
    }
  },
  effects: {
    *fetchDeliveryMethodOptions(action, { call, put }) {
      const result = yield call(fetchDeliveryMethods);
      yield put({ type: 'updateDeliveryMethodOptions', payload: result })
    },
    *fetchPaymentMethodOptions(action, { call, put }) {
      const result = yield call(fetchPaymentMethods);
      yield put({ type: 'updatePaymentMethodOptions', payload: result })
    }
  },
  subscriptions: {

  },
};
