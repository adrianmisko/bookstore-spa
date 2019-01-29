import React from 'react';
import { connect } from 'dva';
import { Icon, Input, AutoComplete, Skeleton } from 'antd';
import { debounce } from 'lodash';
import Link from 'umi/link';


const SearchBar = ({ dispatch, booksFound, history, queryInProgress }) => {

  const Option = AutoComplete.Option;
  let options = booksFound.map(book =>
    <Option
      key={book.id}
      value={book.title}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Link to={`/books/${book.id}`} style={{color: 'rgba(0,0,0,0.8)'}}>
          <img
            src={book.cover}
            style={{
              width: 39,
              height: 52,
              borderRadius: 3,
            }}
            alt={'cover'}
          />
        </Link>
        <span>
          <Link to={`/books/${book.id}`} style={{color: 'rgba(0,0,0,0.8)'}}>{book.title}</Link>
          {book.authors_names.length === 0 ?
            null
            :
            <span>, <Link to={`/search?authors_name=${book.authors_names[0].name}`} style={{color: 'rgba(0,0,0,0.8)'}}>
              {book.authors_names[0].name}
            </Link></span>}
      </span>
        <span onClick={() => dispatch({ type:'books/addToCart', payload: book.id})}>
          <Icon type={'shopping-cart'} /> Add
        </span>
      <span>
        ${book.pricing.price}
      </span>
      </div>
    </Option>);

  const mock = Array(3).fill(0).map((_, idx) => idx + 1);
  const skeleton = mock.map(elem =>
    <AutoComplete.Option
      key={elem}
      value={elem.toString()}
    >
      <Skeleton avatar paragraph={{ rows: 1 }} active/>
    </AutoComplete.Option>,
  );


  const handleBlur = () => {
    dispatch({ type: 'searchBar/clearDataSource' });
  };


  const handleChange = value => {
    if (value === '') {
      dispatch({ type: 'searchBar/clearDataSource' });
    } else {
      dispatch({
        type: 'searchBar/searchForBooks',
        payload: value,
      });
    }
  };

  return (
    <AutoComplete
      dataSource={queryInProgress ? skeleton : options}
      style={{
        marginRight: '1em',
        marginLeft: '1em',
        marginTop: 7,
        maxWidth: 500,
        width: '100%',
      }}
      onChange={debounce(handleChange, 300)}
      onBlur={handleBlur}
      notFoundContent={<span>No results </span>}
      placeholder="Title, author..."
      optionLabelProp={'value'}
    >
      <Input suffix={<Link to={'/search'}><Icon type="search"/></Link>}/>
    </AutoComplete>
  );
};

export default connect(({ searchBar }) => searchBar)(SearchBar);
