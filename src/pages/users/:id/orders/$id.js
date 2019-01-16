import React from 'react';
import { Timeline, Icon, Spin, Card, Button } from 'antd';
import { connect } from 'dva';
import CardCenteredLayout from '../../../../components/CardCenteredLayout/CardCenteredLayout';
import moment from 'moment';
import ItemsOrdered from '../../../../components/ItemsOrdered/ItemsOrdered';
import AnimatedNumber from 'react-animated-number';
import Link from 'umi/link';

const Order = ({ order, isLoading, userId }) => {

  const extra = <Link to={`/users/${userId}`}>
    <Button
    htmlType="primary"
    shape="circle"
    icon="arrow-left"
  /></Link>;

  const ifPaid = (order.payment_date !== null ?
    <Timeline.Item>Online payment on {moment(order.payment_date).format('MMMM Do YYYY')}</Timeline.Item>
    :
    null);

  const messages = {
    'IN_PREPARATION': 'Your order is being prepared',
    'PAYMENT_REQUIRED': 'This order is awaiting payment',
    'IN_DELIVERY': 'Your books are being delivered',
  };

  const contents = {
    'IN_PREPARATION': <React.Fragment>
      {ifPaid}
    </React.Fragment>,
    'PAYMENT_REQUIRED': null,
    'IN_DELIVERY': <React.Fragment>
      {ifPaid}
    </React.Fragment>,
    'SUCCESS':
      [<Timeline.Item>Payment on {moment(order.payment_date).format('MMMM Do YYYY')}</Timeline.Item>,
      <Timeline.Item>Delivered on {moment(order.delivered_on).format('MMMM Do YYYY')}</Timeline.Item>],
    'ERROR':
      <Timeline.Item>An error has occured</Timeline.Item>
  };

  return (
    <Spin
      style={{ transform: 'translate(-2em, 5vh)' }}
      indicator={<Icon type="loading" style={{ fontSize: '5em' }} spin/>}
      spinning={isLoading}
    >
      <CardCenteredLayout
        extra={extra}
        maxWidth={1200}
        title={<h2 style={{ marginBottom: 0 }}>Order ID: {order.id}</h2>}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 1.5em 1.5em 1.5em'
          }}
        >
          <div
            style={{
              width: '30%',
              marginTop: '2em'
            }}
          >
            <Timeline
              pending={(!['SUCCESS', 'ERROR'].includes(order.status)) && messages[order.status]}
            >
              <Timeline.Item>Ordered on {moment(order.order_date).format('MMMM Do YYYY')}</Timeline.Item>
              {contents[order.status]}
            </Timeline>
          </div>
          <div
            style={{
              width: '70%',
            }}
          >
            <Card
              title="Books ordered"
              bordered={false}
            >
              <ItemsOrdered
                items={order.items_ordered.map(itemOrdered => ({
                  ...itemOrdered.book,
                  quantity: itemOrdered.quantity,
                }))}
              />
            </Card>
          </div>
        </div>
        <div
          style={{
            float: 'right',
            marginTop: '1em',
            marginBottom: '2emz',
          }}
        >
          <h3>Total</h3>
          <AnimatedNumber
            component="h2"
            value={order.items_ordered.map(itemOrdered => ({ ...itemOrdered.book, quantity: itemOrdered.quantity }))
              .reduce((acc, item) => acc + item.price * item.quantity, order.delivery_method.cost)}
            style={{
              transition: '0.8s ease-out',
              transitionProperty: 'background-color, color, opacity',
            }}
            duration={300}
            formatValue={n => '$' + n.toFixed(2).toString()}
          />
        </div>
        <br/>
        <Card
          style={{
            marginTop: '5em',
          }}
          bordered={false}
          title={<h3 style={{ marginBottom: 0 }}>Details</h3>}
        >
          <div
            style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '1em' }}
          >
            <div
              style={{ marginBottom: '1em' }}
            >
              <h3>Location</h3>
              <p style={{ marginBottom: 0 }}>Place: {order.location.place}</p>
              <p style={{ marginBottom: 0 }}>Street name: {order.location.street_name}</p>
              <p style={{ marginBottom: 0 }}>Street number: {order.location.street_number}</p>
              {order.location.flat_number !== '' ?
                <p style={{ marginBottom: 0 }}>Flat number: {order.location.flat_number}</p>
                : null}
              <p style={{ marginBottom: 0 }}>Zip code: {order.location.zip_code}</p>
            </div>
            <br/>
            <div>
              <h3>Delivery method</h3>
              <p>{order.delivery_method.name} ({order.delivery_method.cost})</p>
            </div>
            <div>
              <h3>Payment method</h3>
              <p>{order.payment_method.name}</p>
            </div>
            <div>
              <h3>Payment ID (external payment system)</h3>
              <p>{order.payment_id !== null ? <a>{order.payment_id}</a> : <span>None</span>}</p>
            </div>
            <div>
              <h3>Payment method</h3>
              <p>{order.payment_method.name}</p>
            </div>
          </div>
        </Card>
      </CardCenteredLayout>
    </Spin>
  );
};

export default connect(({ user }) => user)(Order);
