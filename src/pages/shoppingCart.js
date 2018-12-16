import React from 'react';
import ProductList from '../components/ProductList/ProductList';
import { connect } from 'dva';

const ShoppingCart = ({dispatch, items}) => {

  return (
    <ProductList dispatch={dispatch} products={items} loading={false} />
  );

};

export default connect(({ books }) => books)(ShoppingCart);
