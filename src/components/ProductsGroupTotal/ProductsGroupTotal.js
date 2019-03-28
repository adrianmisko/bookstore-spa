import React from 'react';
import AnimatedNumber from 'react-animated-number';

const ProductsGroupTotal = ({ items }) => {
  let item = items[0];
  return (
    <span>
      //if any item has any disocunt ----- and normal else only normal
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
  );
};

export default ProductsGroupTotal;
