import React from 'react';
import { connect } from 'dva';
import { Icon, Input, AutoComplete } from 'antd';
import { debounce } from 'lodash';


const SearchBar = ({ dispatch, booksFound, history }) => {

  const Option = AutoComplete.Option;
  const options = booksFound.map(book =>
    <Option
      key={book.id}
      value={book.title}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
      <img
        src={book.cover}
        style={{
          width: 39,
          height: 52,
          borderRadius: 3
        }}
        alt={'cover'}
      />
      <span>
        {book.title}
      </span>
      {
        book.authors_names.length === 0 ?
          null
          :
          <span style={{ float: 'right' }}>
              {book.authors_names[0].name}
            </span>
      }
      <span>
        {book.base_price}
      </span>
      </div>
    </Option>);


  const handleBlur = () => {
    dispatch({ type: 'search/clearDataSource' });
  };


  const handleSelect = (value, option) => {
    dispatch({ type: 'search/clearDataSource' });
    dispatch({
      type: 'book/update',
      payload: booksFound.filter(book => book.id === option.key.toNumber()).first()
    });
    history.push('/books/' + option.key);
  };

  const handleChange = value => {
    dispatch({
      type: 'search/searchForBooks',
      payload: value,
    });
  };

  return (
    <AutoComplete
      dataSource={options}
      style={{
        marginRight: '1em',
        marginLeft: '1em',
        marginTop: 7,
        maxWidth: 500,
        width: '100%',
      }}
      onChange={debounce(handleChange, 300)}
      onSelect={handleSelect}
      onBlur={handleBlur}
      placeholder="Title, author..."
      optionLabelProp={'value'}
    >
      <Input suffix={<Icon type="search"/>}/>
    </AutoComplete>
  );
};

export default connect(({ search }) => search)(SearchBar);
