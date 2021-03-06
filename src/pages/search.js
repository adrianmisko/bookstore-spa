import React from 'react';
import PageSearchLayout from '../components/PageSearchLayout/PageSearchLayout';
import FilterOptionsBar from '../components/FilterOptionsBar/FilterOptionsBar';
import ResultsList from '../components/ProductList/ProductList';


const Search = () => {

  return (
    <PageSearchLayout
      FilterOptionsBar={FilterOptionsBar}
      ResultsList={ResultsList}
    />
  );
};

export default Search;
