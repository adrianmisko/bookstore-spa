

export default {
  namespace: 'ui',
  state: {
    currentTab: 'tab1',
    currentKey: 'main',
  },
  reducers: {
    changeTab(state, { payload: newTab }) {
      return { ...state, currentTab: newTab }
    },
    changeKey(state, { payload: newKey } ) {
      return { ...state, currentKey: newKey }
    }
  },
}
