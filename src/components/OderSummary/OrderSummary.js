import React from 'react';
import { connect } from 'dva';
import AnimatedNumber from 'react-animated-number';

const OrderSummary = ({ order, books }) => {

  const { location, deliveryMethod, paymentMethod } = order;
  const { products, itemsInCart } = books;

  const fromCamel = value => {
    let res = value.split(/(?=[A-Z])/);
    res[0] = res[0][0].toUpperCase() + res[0].substring(1);
    for (let i = 1; i < res.length; i++)
      res[i] = res[i].toLowerCase();
    return res.join(' ');
  };

  const inCart = products.filter(product => {
    return Object.keys(itemsInCart).includes(product.id.toString()) && itemsInCart[product.id] > 0;
  }).map(item => {
    return { ...item, ...{ quantity: itemsInCart[item.id] } };
  });

  return (
    <div>
      <br />
      <div>
        <h3>Location</h3>
        {Object.keys(location).map(key => <p style={{ marginBottom: -1.5 }}>{fromCamel(key)}: {location[key]}</p>)}
      </div>
      <br />
      <div>
        <h3>Delivery method</h3>
        <p>{deliveryMethod.name} ({deliveryMethod.cost})</p>
      </div>
      <div>
        <h3>Payment method</h3>
        <p>{paymentMethod.name}</p>
      </div>
      <div>
      <h3>Total</h3>
      <AnimatedNumber
        component="text"
        value={inCart.reduce((acc, item) => acc + item.price * item.quantity, deliveryMethod.cost)}
        style={{
          transition: '0.8s ease-out',
          transitionProperty: 'background-color, color, opacity',
        }}
        duration={300}
        formatValue={n => '$' + n.toFixed(2).toString()}
      />
      </div>
    </div>
  );
};

export default connect(({ order, books }) => ({ order, books }))(OrderSummary);
