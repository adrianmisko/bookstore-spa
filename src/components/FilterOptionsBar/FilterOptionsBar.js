import React from 'react';
import { Select, Slider, DatePicker, Checkbox, Button, Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import { debounce, some } from 'lodash';

const FilterOptionList = ({ options, dispatch, dataSet, pricesRange, autocompleteLoading, values }) => {


  const handleGenresChange = values => {
    dispatch({
      type: 'search/updateValue',
      payload: {
        optionName: 'genres',
        newValues: values,
      },
    });
  };

  const handleGenresFocus = () => {
    if (options.genres.length === 0) {
      dispatch({
        type: 'search/getAutocompleteOptions',
        payload: {
          optionName: 'genres',
          searchBy: '', // no request args => GET all
        },
      });
    }
  };


  const handleAuthorsChange = values => {
    dispatch({
      type: 'search/updateValue',
      payload: {
        optionName: 'authors_names',
        newValues: values,
      },
    });
  };

  const handleAuthorsSearch = value => {
    if (value.length > 2) {
      dispatch({
        type: 'search/getAutocompleteOptions',
        payload: {
          optionName: 'authors_names',
          searchBy: value,
        },
      });
    }
  };

  const handlePublishersChange = values => {
    dispatch({
      type: 'search/updateValue',
      payload: {
        optionName: 'publishers',
        newValues: values,
      },
    });
  };

  const handlePublishersFocus = () => {
    if (options.publishers.length === 0) {
      dispatch({
        type: 'search/getAutocompleteOptions',
        payload: {
          optionName: 'publishers',
          searchBy: '',
        },
      });
    }
  };

  const handleTagsChange = values => {
    dispatch({
      type: 'search/updateValue',
      payload: {
        optionName: 'tags',
        newValues: values,
      },
    });
  };

  const handleTagsFocus = () => {
    if (options.tags.length === 0) {
      dispatch({
        type: 'search/getAutocompleteOptions',
        payload: {
          optionName: 'tags',
          searchBy: '',
        },
      });
    }
  };

  const handlePriceSliderChange = values => {
    dispatch({
      type: 'search/updateValue',
      payload: {
        optionName: 'price',
        newValues: values,
      },
    });
  };

  const handleAvailableSwitchChange = e => {
    let value = e.target.checked;

    dispatch({
      type: 'search/updateValue',
      payload: {
        optionName: 'available',
        newValues: value,
      },
    });
  };

  const handleFeaturedSwitchChange = e => {
    let value = e.target.checked;

    dispatch({
      type: 'search/updateValue',
      payload: {
        optionName: 'featured',
        newValues: value,
      },
    });
  };

  const handleSearch = () => {
    if (some(Object.values(values).filter(elem => Array.isArray(elem) && elem.length > 0))) {
      dispatch({
        type: 'search/search',
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
        value={values.genres}
        onChange={handleGenresChange}
        onFocus={handleGenresFocus}
        loading={autocompleteLoading.genres}
        notFoundContent="Getting genres..."
        allowClear
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
        value={values.authors_names}
        onChange={handleAuthorsChange}
        onSearch={debounce(handleAuthorsSearch, 250)}
        onBlur={() => dispatch({ type: 'search/clearOption', payload: 'authors_names' })}
        loading={autocompleteLoading.authors_names}
        notFoundContent="Nothing found"
        allowClear
      >
        {options.authors_names.map(author_name => <Select.Option key={author_name}>{author_name}</Select.Option>)}
      </Select>
      <div>Publishers:</div>
      <Select
        size="large"
        style={{
          width: '100%',
        }}
        mode="multiple"
        placeholder="Publishers"
        value={values.publishers}
        onChange={handlePublishersChange}
        onFocus={handlePublishersFocus}
        loading={autocompleteLoading.publishers}
        notFoundContent="Getting publishers..."
        allowClear
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
        onChange={handleTagsChange}
        value={values.tags}
        onFocus={handleTagsFocus}
        loading={autocompleteLoading.tags}
        notFoundContent="Getting tags..."
        allowClear
      >
        {options.tags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
      </Select>
      <div>Release date:</div>
      <DatePicker.RangePicker
        style={{ width: '100%' }}
        size="large"
        disabled
      />
      <div>Price:</div>
      <Slider
        value={values.price}
        range
        min={pricesRange.min}
        max={pricesRange.max}
        onChange={handlePriceSliderChange}
        tipFormatter={value => `$${value}`}
        disabled
      />
      <div style={{ marginTop: 20 }}>
        <Row>
          <Col span={8}>
            <Checkbox
              checked={values.featured}
              onChange={handleFeaturedSwitchChange}
            >
              Featured
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox
              checked={values.available}
              onChange={handleAvailableSwitchChange}
            >
              Available
            </Checkbox>
          </Col>
        </Row>
      </div>
      <Button
        style={{
          margin: '30px auto 10px auto',
          width: '50%',
          display: 'block',
        }}
        onClick={handleSearch}
      >
        Search <Icon type="search"/>
      </Button>
    </div>
  );
};

export default connect(({ search }) => search)(FilterOptionList);
