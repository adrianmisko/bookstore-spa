

export default {
  namespace: 'user',
  state: {
    currentTab: 'tab1',
  },
  reducers: {
    changeTab(state, { payload: newTab }) {
      return { ...state, currentTab: newTab}
    }
  },
}
