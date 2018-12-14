import styles from '../components/ProductList/ProductList.css';
import React from 'react';
import ProductList from '../components/ProductList/ProductList';
import { connect } from 'dva';

const Index = ({ products, loading }) => {
  return(
    <React.Fragment>
      <h1 className={styles.featured}>Featured books</h1>
      <ProductList products={products} loading={loading}/>
    </React.Fragment>
  );
};


export default connect(({ books }) => books)(Index);
