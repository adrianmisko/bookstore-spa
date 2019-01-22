import React from 'react';
import { connect } from 'dva';
import { Badge, Popover, List, Button, Icon } from 'antd';
import basketIcon from '../../assets/basket.png';
import Link from 'umi/link';
import AnimatedNumber from 'react-animated-number';
import TweenOne from 'rc-tween-one';


const ShoppingCart = ({ dispatch, books, user }) => {

  let { products, itemsInCart, restartAnimation, firstLoad } = books;
  const { isLoggedIn } = user;

  itemsInCart = itemsInCart || [];
  products = products || [];

  const title = <span>Your shopping cart</span>;

  const inCart = products.filter(product => {
    return Object.keys(itemsInCart).includes(product.id.toString()) && itemsInCart[product.id] > 0;
  }).map(item => {
    return { ...item, ...{ quantity: itemsInCart[item.id] } };
  });

  const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
  const p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
  const ease0 = TweenOne.easing.path(p0);
  const ease1 = TweenOne.easing.path(p1);
  const animation = [
    {
      y: -10,
      ease: ease0,
      repeat: 1,
      yoyo: true,
      duration: 500,
    },
    {
      appearTo: 0,
      scaleX: 0,
      scaleY: 2,
      repeat: 1,
      yoyo: true,
      ease: ease1,
      duration: 500,
    },
  ];

  const content = (
    <div>
      {
        Object.keys(inCart).length ?
          <React.Fragment>
            <List
              itemLayout="horizontal"
              dataSource={inCart}
              renderItem={item =>
                <div>
                  <List.Item
                    actions={[
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
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<img alt="cover" style={{ height: 68, width: 52, float: 'left', borderRadius: 5 }}
                                   src={item.cover}/>}
                      title={item.title}
                      description={
                        <div>
                        <span>
                          {
                            <AnimatedNumber
                              component="text"
                              value={item.quantity}
                              style={{
                                transition: '0.8s ease-out',
                                transitionProperty: 'background-color, color, opacity',
                              }}
                              duration={300}
                              formatValue={n => 'Quantity: ' + n.toFixed(0).toString()}
                            />
                          }
                        </span>
                          <br/>
                          <span>
                            <span>
                          {
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
                          }
                        </span>
                        </span>
                        </div>}
                    />
                  </List.Item>
                </div>
              }
            />
            <div style={{ display: 'flex', marginTop: 10, marginBottom: -10 }}>
              <p style={{ fontSize: '1.15em' }}>
                <AnimatedNumber
                  component="text"
                  value={inCart.reduce((acc, item) => acc + item.pricing.price * item.quantity, 0)}
                  style={{
                    transition: '0.8s ease-out',
                    transitionProperty: 'background-color, color, opacity',
                  }}
                  duration={300}
                  formatValue={n => 'Total price: $' + n.toFixed(2).toString()}
                />
              </p>
              <Button
                type={'danger'}
                style={{ marginLeft: 'auto', marginTop: -5 }}
                onClick={() => dispatch({
                  type: 'books/clearCart',
                })}
              >
                Remove all
              </Button>
            </div>
            <br/>
            <div>
              <Link to={'/shoppingCart'}>See the details</Link>
              <span onClick={() => dispatch({ type: 'order/clearData' })}>
                {isLoggedIn ?
                  <Link to={'/order'} style={{ float: 'right' }}>Buy »</Link>
                  :
                  <a
                    style={{ float: 'right' }}
                    onClick={() => dispatch({type: 'ui/showLoginModal'})}
                  >
                    Buy »
                  </a>}
              </span>
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <p style={{ marginTop: 10 }}>Your shopping cart is empty</p>
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
        trigger="hover"
      >
        <a>
          <Badge
            count={Object.values(itemsInCart).reduce((a, b) => a + b, 0)}
            showZero={true}
            overflowCount={10}
            title={'Items in cart'}
            style={{ backgroundColor: '#f44941' }}
          >
            <TweenOne
              animation={animation}
              moment={restartAnimation ? 0 : null}
              paused={firstLoad}
            > {
              <img
                src={basketIcon}
                alt="shopping cart"
                style={{ height: 29, width: 29 }}
              />
            }
            </TweenOne>
          </Badge>
        </a>
      </Popover>
    </div>
  );
};

export default connect(({ books, user }) => ({books, user}))(ShoppingCart);
