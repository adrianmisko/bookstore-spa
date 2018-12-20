import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';


const ShoppingCart = ({dispatch, products, itemsInCart}) => {

  itemsInCart = itemsInCart || [];
  products = products || [];
  const inCart = products.filter(product =>
    { return Object.keys(itemsInCart).includes(product.id.toString()) && itemsInCart[product.id] > 0}).map(item =>
      { return { ...item, ...{ quantity: itemsInCart[item.id] } } });


  const columns = [{
    title: 'Cover',
    dataIndex: 'mianiature',
    key: 'mianiature',
    className: 'cover-column',
    render: row => {
      return <img src={row} alt="cover" style={{width: '100%', maxWidth: 135}}/>
      }
  }, {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  }, {
    title: 'Action',
    key: 'operation',
    render: () => <a href="javascript:;">action</a>,
  }];

  return (
    <React.Fragment>
      <h1 style={{ textAlign: 'center' }}>Your cart</h1>
      <Table
        columns={columns}
        dataSource={inCart}
      >
      </Table>
    </React.Fragment>
  );

};

export default connect(({ books }) => books)(ShoppingCart);
