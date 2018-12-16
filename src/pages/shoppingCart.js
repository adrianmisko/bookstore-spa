import React from 'react';
import ProductList from '../components/ProductList/ProductList';
import { connect } from 'dva';

const ShoppingCart = ({dispatch, items}) => {

  return (
    <h1>Details</h1>
  );

};

export default connect(({ books }) => books)(ShoppingCart);
