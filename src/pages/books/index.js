import styles from './index.css';
import React from 'react';
import ProductList from '../../components/ProductList';
import { connect} from 'dva';


const Books = ({dispatch, products}) => {
  function handleDelete(id) {
    dispatch({
      type: 'books/delete',
      payload: id,
    });
  };

  return(
    <ProductList onDelete={handleDelete} products={products}/>
  );
};

export default connect(({ books })=> books)(Books)
