import { Button, Icon, List } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import React from 'react';
import { isEmpty } from 'lodash';
import AnimatedNumber from 'react-animated-number';
import BookPriceSpan from '../BookPriceSpan/BookPriceSpan';
import DiscountTag from '../DisocuntTag/DiscountTag';


const ProductList = ({ search, ownProps, dispatch }) => {

  const { queryInProgress, pagination } = search;
  const dataSet = search.dataSet;

  const IconText = ({ type, text, click }) => (
    <span onClick={click}>
      <Icon type={type} style={{ marginRight: 8 }}/>
      {text}
    </span>
  );

  const summaryActions = item => [
    <Button
      type={'default'}
      style={{ fontSize: 18 }}
      onClick={() => {
        dispatch({
          type: 'shoppingCart/add',
          payload: item,
        });
      }}
    >
      +
    </Button>,
    <Button
      type={'default'}
      style={{ fontSize: 18 }}
      disabled={item.quantity === 1}
      onClick={() => {
        dispatch({
          type: 'shoppingCart/removeOneFromCart',
          payload: item.id,
        });
      }}
    >
      –
    </Button>,
    <Button
      type={'danger'}
      style={{ fontSize: 18 }}
      onClick={() => {
        dispatch({
          type: 'shoppingCart/removeAllFromCart',
          payload: item.id,
        });
      }}
    >
      <Icon type="delete"/>
    </Button>,
  ];

  const summaryContent = item => <div>
    <span>
      {<AnimatedNumber
        component="text"
        value={item.quantity}
        style={{
          transition: '0.8s ease-out',
          transitionProperty: 'background-color, color, opacity',
        }}
        duration={300}
        formatValue={n => 'Quantity: ' + n.toFixed(0).toString()}
      />}
    </span>
    <br/>
    <span>
      <span>
        <AnimatedNumber
          component="text"
          value={item.quantity * item.pricing.price}
          style={{
            transition: '0.8s ease-out',
            transitionProperty: 'background-color, color, opacity',
          }}
          duration={300}
          formatValue={n => 'Price: $' + n.toFixed(2).toString()}
        />
      </span>
    </span>
  </div>;

  return (
    <List
      loading={isEmpty(ownProps) ? queryInProgress : false}
      itemLayout="vertical"
      pagination={{
        size: 'large',
        pageSize: pagination.pageSize,
        current: pagination.current,
        total: pagination.total,
        onChange: (page, pageSize) => dispatch({ type: 'search/changePage', payload: page })
      }}
      dataSource={isEmpty(ownProps) ? dataSet : ownProps.books}
      renderItem={item => (
        <List.Item
          style={{
            paddingTop: 8,
            paddingBottom: 4,
          }}
          key={item.title}
          actions={
            isEmpty(ownProps) ?
              [<IconText
                type="shopping-cart"
                text="add to shopping cart"
                click={() => dispatch({ type: 'shoppingCart/add', payload: item })}
              />]
              :
              summaryActions(item)
          }
          extra={
            <img
              style={{
                margin: '5px auto 20px auto',
                padding: 5,
                maxHeight: 170,
                maxWidth: 135,
                minWidth: 70,
                width: '100%',
                height: '100%',
              }}
              alt="cover"
              src={item.cover}
            />}
        >
          <List.Item.Meta
            title={
              <Link
                to={'/books/' + item.id.toString()}
                style={{ color: 'rgba(0,0,0,0.9)' }}
              >
                {item.title}
              </Link>
            }
            description={
              <React.Fragment>
                {item.authors_names.map((author_name, idx) =>
                  <span>
                    <Link to={'/search?authors_name=' + author_name.name} style={{ color: 'rgba(0,0,0,0.70)' }}>
                     {(idx ? ', ' : '')}{author_name.name}
                    </Link>
                  </span>,
                )}
                <br/>
              </React.Fragment>
            }
          />
          <span>
            {isEmpty(ownProps) ?
              <BookPriceSpan book={item}/>
              :
              summaryContent(item)
            }
          </span>
          <div>
            {item.pricing.product_pricing_valid_until || item.pricing.category_discount_valid_until ?
              <DiscountTag book={item}/> : null}
          </div>
        </List.Item>
      )}
    />
  );
};

export default connect(({ search }, ownProps) => ({ search, ownProps }))(ProductList);
