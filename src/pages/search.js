import ProductList from '../components/ProductList/ProductList';
import React from 'react';
import { connect } from 'dva';

const Search = ({ products, loading }) => {
  return (
    <ProductList onDelete={() => console.log('delete')} products={products} loading={loading}/>
  );
};

export default connect(({ books }) => books)(Search);
