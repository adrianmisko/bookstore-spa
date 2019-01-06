import React from 'react';
import { Select, Slider, DatePicker, Switch } from 'antd';
import { connect } from 'dva';
import { debounce } from 'lodash';

const FilterOptionList = ({ options, dispatch, dataSet, pricesRange, autocompleteLoading }) => {

  const handleGenresSearch = () => {
    if (options.genres.length === 0) {
      dispatch({
        type: 'search/getAutocompleteOptions',
        payload: {
          optionName: 'genre',
          searchBy: '' // no request args => GET all
        }
      });
    }
  };

  return (
    <div>
      <div>Genres:</div>
      <Select
        size="large"
        style={{
          width: '100%',
        }}
        mode="multiple"
        placeholder="Genres"
        onFocus={handleGenresSearch}
        loading={autocompleteLoading.genres}
        notFoundContent={'Getting genres...'}
      >
        {options.genres.map(genre => <Select.Option key={genre}>{genre}</Select.Option>)}
      </Select>
      <div>Authors:</div>
      <Select
        size="large"
        style={{
          width: '100%',
        }}
        mode="multiple"
        placeholder="Authors"
      >
        {options.authors.map(author_name => <Select.Option key={author_name}>{author_name}</Select.Option>)}
      </Select>
      <div>Publishers:</div>
      <Select
        size="large"
        style={{
          width: '100%',
        }}
        mode="multiple"
        placeholder="Publishers"
      >
        {options.publishers.map(publisher => <Select.Option key={publisher}>{publisher}</Select.Option>)}
      </Select>
      <div>Tags:</div>
      <Select
        size="large"
        style={{
          width: '100%',
        }}
        mode="multiple"
        placeholder="Tags"
      >
        {options.tags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
      </Select>
      <div>Release date:</div>
      <DatePicker.RangePicker
        style={{ width: '100%' }}
        size="large"
        disabled={dataSet.length === 0}
      />
      <div>Price:</div>
      <Slider
        defaultValue={dataSet.length === 0 ? [0, 100] : pricesRange}
        tooltipVisible={dataSet.length !== 0}
        range
        disabled={dataSet.length === 0}
      />
      <div style={{ marginTop: 20 }}>
        Featured:
        <Switch
          defaultUnchecked
          disabled={dataSet.length === 0}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        Available:
        <Switch
          defaultUnchecked
          disabled={dataSet.length === 0}
        />
      </div>
    </div>
  );
};

export default connect(({ search }) => search)(FilterOptionList);
