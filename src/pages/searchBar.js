import React from 'react';
import { connect } from 'dva';

const SearchBar = ({ dispatch, products, loading }) => {
  return (
    <h1>page search</h1>
  );
};

export default connect(({ search }) => search)(SearchBar);
