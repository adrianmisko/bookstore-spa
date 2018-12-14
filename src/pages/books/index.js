import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { connect } from 'dva';


const Books = ({ products, loading }) => {

  return(
    <h1 style={{ textAlign: 'center' }}> Books general? </h1>
  );

};

export default connect(({ books })=> books)(Books)
