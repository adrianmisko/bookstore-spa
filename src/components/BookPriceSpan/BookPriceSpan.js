import React from 'react';

const BookPriceSpan = ({ book }) => {

  return (
    <React.Fragment>
    {book.pricing.product_pricing_valid_until || book.pricing.category_discount_valid_until ?
        <span>
          <span style={{ textDecoration: 'line-through', marginRight: '0.5em' }}>
            ${book.pricing.base_price}
          </span>
          <span style={{ fontSize: '1.2em', color: 'rgba(0,0,0,0.7)' }}>
            ${book.pricing.price}
          </span>
        </span>
        :
        <span>
          ${book.pricing.price}
        </span>}
    </React.Fragment>
  );
};

export default BookPriceSpan;
