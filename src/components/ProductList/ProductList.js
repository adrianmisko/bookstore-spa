import { Button, Icon, List } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import React from 'react';
import { isEmpty } from 'lodash';
import AnimatedNumber from 'react-animated-number';


const ProductList = ({ search, ownProps, dispatch }) => {

  const queryInProgress = search.queryInProgress;
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
          type: 'books/addItemToCart',
          payload: item.id,
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
          type: 'books/removeOneFromCart',
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
          type: 'books/removeAllFromCart',
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
        {<AnimatedNumber
          component="text"
          value={item.quantity * item.pricing.price}
          style={{
            transition: '0.8s ease-out',
            transitionProperty: 'background-color, color, opacity',
          }}
          duration={300}
          formatValue={n => 'Price: $' + n.toFixed(2).toString()}
        />}
      </span>
    </span>
  </div>;

  return (
    <List
      loading={isEmpty(ownProps) ? queryInProgress : false}
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
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
                click={() => dispatch({ type: 'books/addToCart', payload: item.id })}
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
                    <Link to={'/search?author=' + author_name.name} style={{ color: 'rgba(0,0,0,0.70)' }}>
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
              <span>${item.pricing.price}</span>
              :
              summaryContent(item)
            }
          </span>
        </List.Item>
      )}
    />
  );
};

export default connect(({ search }, ownProps) => ({ search, ownProps }))(ProductList);
