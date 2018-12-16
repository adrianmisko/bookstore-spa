import React from 'react';
import { connect } from 'dva';
import { Badge, Popover, Divider } from 'antd';
import basketIcon from '../../assets/basket.png';
import Link from 'umi/link';


const ShoppingCart = ({ products, itemsInCart }) => {

  const title = <span>Your shopping cart</span>;

  const content = (
    <div style={{
      marginTop: 5
    }}>
      {
        Object.keys(itemsInCart).length ?
          <React.Fragment>
            {Object.keys(itemsInCart).map(item => <p>{itemsInCart[item]}</p>)}  // todo table or list
            <Divider/>
            <Link to={'/shoppingCart'}>See the details</Link>
          </React.Fragment>
          :
          <React.Fragment>
            <p>Your shopping cart is empty</p>
          </React.Fragment>
      }
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
      <Popover
        placement="bottomLeft"
        title={title}
        content={content}
        trigger="click"
      >
        <a>
          <Badge
            count={Object.values(itemsInCart).reduce((a, b) => a + b, 0)}
            showZero={true}
            overflowCount={10}
            title={'Items in cart'}
            style={{ backgroundColor: '#f44941' }}
          >
            <img
              src={basketIcon}
              alt="shopping cart"
              style={{ height: 29, width: 29 }}
            />
          </Badge>
        </a>
      </Popover>
    </div>
  );
};

export default connect(({ books }) => books)(ShoppingCart);
