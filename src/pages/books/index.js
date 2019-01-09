import React from 'react';
import ProductListCardType from '../../components/ProductList/ProductListCardType';
import { connect } from 'dva';


const Books = ({ dispatch, products, loading }) => {

  return(
    <h1 style={{ textAlign: 'center' }}> Books general? </h1>
  );

};

export default connect(({ books })=> books)(Books)
