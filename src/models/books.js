export default {
  namespace: 'books',
  state: { products: [] },
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    'get'(state, { payload: _} ) {
      return {...state, products: [ { name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'},{ name: 'adrian'}, { name: 'oliwia'}, ] };
      }
  },
};
