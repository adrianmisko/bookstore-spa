
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
    deliveryMethod: null
  },
  reducers: {
    saveLocation(state, { payload: location }) {
      return { ...state, location }
    },
    saveDeliveryMethod(state, { payload: deliveryMethod }) {
      return { ...state, deliveryMethod }
    }
  },
  effects: {

  },
  subscriptions: {

  },
};
