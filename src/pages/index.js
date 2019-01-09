import styles from '../components/ProductList/ProductListCardType.css';
import React from 'react';
import ProductListCardType from '../components/ProductList/ProductListCardType';
import { connect } from 'dva';

const Index = ({ dispatch, products, loading }) => {
  return(
    <React.Fragment>
      <h1 className={styles.featured}>Featured books</h1>
      <ProductListCardType dispatch={dispatch} products={products} loading={loading}/>
    </React.Fragment>
  );
};


export default connect(({ books }) => books)(Index);
