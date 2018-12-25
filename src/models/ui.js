

export default {
  namespace: 'ui',
  state: {
    currentTab: 'tab1',
    currentKey: 'main',
    loginModalVisible: false,
  },
  reducers: {
    changeTab(state, { payload: newTab }) {
      return { ...state, currentTab: newTab }
    },
    changeKey(state, { payload: newKey } ) {
      return { ...state, currentKey: newKey }
    },
    showLoginModal(state) {
      return { ...state, loginModalVisible: true }
    },
    hideLoginModal(state) {
      return { ...state, loginModalVisible: false }
    },
  },
}
