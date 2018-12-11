export default {
  namespace: 'books',
  state: { products: [ { name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'}, ] },
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    }
  },
};
