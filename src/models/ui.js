

export default {
  namespace: 'ui',
  state: {
    currentTab: 'tab1',
    currentKey: 'main',
    loginModalVisible: false,
    registerDrawerVisible: false,
    currentStep: 0,
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
    showRegisterDrawer(state) {
      return { ...state, registerDrawerVisible: true }
    },
    hideRegisterDrawer(state) {
      return { ...state, registerDrawerVisible: false }
    },
    stepForward(state) {
      return { ...state, currentStep: state.currentStep + 1 }
    },
    stepBackward(state) {
      return { ...state, currentStep: state.currentStep - 1 }
    },
    resetSteps(state) {
      return { ...state, currentStep: 0 }
    }
  },
}
