import styles from './$id.css';
import { connect } from 'dva';
import React from 'react';

const Book = props => {
  console.log(props);
  return (
    <div className={styles.normal}>
      <h1>Page $id</h1>
    </div>
  );
};

export default connect(({ book }) => book)(Book);
