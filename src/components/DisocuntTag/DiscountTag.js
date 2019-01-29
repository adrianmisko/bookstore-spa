import { Icon, Popover, Tag } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from '../ProductList/ProductListCardType.css';


const DiscountTag = ({ book, absolute }) => {

  const style = absolute ? {
    position: 'absolute',
      top: 20 + 25 * book.tags.length,
      left: 3,
      backgroundColor: '#f50',
      borderColor: '#f50',
      color: 'white',
  } : {
    marginTop: 10,
    backgroundColor: '#f50',
    borderColor: '#f50',
    color: 'white',
  };

  return (
    <Popover
      title={null}
      placement="bottomLeft"
      arrowPointAtCenter
      content={<span>
                    {book.pricing.product_pricing_valid_until ?
                      <React.Fragment>
                        {book.pricing.product_pricing_discount_percent !== 0 ?
                          <span>
                            {book.pricing.product_pricing_discount_percent}% discount
                          </span> : null}
                        {book.pricing.product_pricing_discount_percent !== 0 && book.pricing.product_pricing_discount_value !== 0 ?
                          <br/> : null}
                        {book.pricing.product_pricing_discount_value !== 0 ?
                          <span>
                            {book.pricing.product_pricing_discount_value}$ discount
                          </span> : null}
                        <span><br/> Valid until {moment(book.pricing.product_pricing_valid_until).format('MMMM Do YYYY')}</span>
                      </React.Fragment>
                      : null}
        {book.pricing.product_pricing_valid_until && book.pricing.category_discount_valid_until ?
          <div style={{ marginTop: '0.5em' }}></div>
          : null}
        {book.pricing.category_discount_valid_until ?
          <React.Fragment>
            {book.pricing.category_discount_discount_percent !== 0 ?
              <span>
                            {book.pricing.category_discount_discount_percent}% discount on {book.pricing.category_name}
                          </span> : null}
            {book.pricing.category_discount_discount_percent !== 0 && book.pricing.category_discount_discount_value !== 0 ?
              <br/> : null}
            {book.pricing.category_discount_discount_value !== 0 ?
              <span>
                            {book.pricing.category_discount_discount_value}$ discount on {book.pricing.category_name}
                          </span> : null}
            <span><br/> Valid until {moment(book.pricing.category_discount_valid_until).format('MMMM Do YYYY')}</span>
          </React.Fragment> : null}
                  </span>}
    >
      <Tag style={style}>
        <Icon
          type="tags"
          className={styles['discount-icon']}
        />
        Discount
      </Tag>
    </Popover>
  );
};

export default DiscountTag;
