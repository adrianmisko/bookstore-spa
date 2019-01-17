import React from 'react';
import { List, Avatar, Icon, Spin, Tooltip, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import CardCenteredLayout from '../CardCenteredLayout/CardCenteredLayout';
import Link from 'umi/link';
import successIcon from '../../assets/success.png';
import errorIcon from '../../assets/error.png';
import deliveryIcon from '../../assets/delivery-truck.png';
import paymentIcon from '../../assets/credit-card.png';
import preparingIcon from '../../assets/timeline.png';


const OrderList = ({ orders, isLoading, userId }) => {

  const status = {
    'IN_PREPARATION': {
      icon: preparingIcon,
      tooltip: 'Your order is being prepared'
    },
    'PAYMENT_REQUIRED': {
      icon: paymentIcon,
      tooltip: 'Awaiting payment'
    },
    'SUCCESS': {
      icon: successIcon,
      tooltip: 'Order delivered successfully'
    },
    'ERROR': {
      icon: errorIcon,
      tooltip: 'There were problems with your order'
    },
    'IN_DELIVERY': {
      icon: deliveryIcon,
      tooltip: 'Your order is being delivered'
    }
  };

  return (
    <CardCenteredLayout
      maxWidth={800}
    >
      <Spin
        style={{ transform: 'translate(-2em, 20vh)' }}
        indicator={<Icon type="loading" style={{ fontSize: '5em' }} spin/>}
        spinning={isLoading}
      >
        <List
          itemLayout="horizontal"
          dataSource={orders}
          pagination={{ perPage: 10 }}
          renderItem={order => (
            <List.Item>
              <List.Item.Meta
                avatar={<Tooltip title={status[order.status].tooltip}>
                  <Avatar src={status[order.status].icon}/>
                </Tooltip>}
                title={<Link to={`/users/${userId}/orders/${order.id}`}>Order ID: {order.id}</Link>}
                description={
                  <React.Fragment>
                    <span>Made on: {moment(order.order_date).format('MMMM Do YYYY')}</span>
                    {order.delivered_on !== null ?
                    <span><br />Delivered on: {moment(order.delivered_on).format('MMMM Do YYYY')}</span>
                      : <React.Fragment><br/>Not yet delivered</React.Fragment>}
                  </React.Fragment>
                }
              />
              <span style={{ marginLeft: 'auto' }}>
                {order.number_of_items} {order.number_of_items > 1 ? 'books' : 'book'}
              </span>
              <span style={{ margin: 'auto 1em auto 1em' }} > – </span>
              <span>${order.total_price} total</span>
            </List.Item>
          )}
        />
      </Spin>
    </CardCenteredLayout>
  );
};

export default connect(({ user }) => user)(OrderList);
