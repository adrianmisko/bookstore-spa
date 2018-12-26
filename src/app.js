export const dva = {
  config: {
    initialState: JSON.parse(window.sessionStorage.getItem('state')),
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    onStateChange(state) {
      window.sessionStorage.setItem('state', JSON.stringify(state));
    },
  },
};
