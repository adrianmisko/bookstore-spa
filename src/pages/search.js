import ProductList from '../components/ProductList/ProductList';
import React from 'react';
import { connect } from 'dva';

const Search = ({ dispatch, products, loading }) => {
  return (
    <ProductList dispatch={dispatch} products={products} loading={loading}/>
  );
};

export default connect(({ books }) => books)(Search);
