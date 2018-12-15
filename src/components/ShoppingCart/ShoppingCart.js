import React from 'react';
import { connect } from 'dva';
import { Badge, Popover } from 'antd';
import booksIconPng from '../../assets/basket.png';
import Link from 'umi/link';


const ShoppingCart = ({ items }) => {

  const title = <span>Your shopping cart</span>;

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div style={{
      fontSize: 32,
      marginTop: -3,
      marginRight: 5,
      maxWidth: 60,
      minWidth: 40,
      flexGrow: 3,
    }}>
      <Popover placement="bottomLeft" title={title} content={content} trigger="hover">
        <Link to={'/shoppingCart'}>
        <Badge count={0} showZero={true} overflowCount={10} title={'Items in cart'}
               style={{ backgroundColor: '#1890ff' }}>
          <img src={booksIconPng} alt="shopping cart" style={{ height: 29, width: 29 }}/>
        </Badge>
      </Link>
    </Popover>
    </div>
  );
};

export default connect(({ shoppingCart }) => shoppingCart)(ShoppingCart);
