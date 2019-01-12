
export default {
  namespace: 'order',
  state: {
    isLoading: false,
    location: {}
  },
  reducers: {
    saveLocation(state, { payload: location }) {
      return { ...state, location }
    }
  },
  effects: {

  },
  subscriptions: {

  },
};
