import React from 'react';
import { connect } from 'dva';
import { Button, Steps } from 'antd';
import CardCenteredLayout from '../components/CardCenteredLayout/CardCenteredLayout';
import ProductList from '../components/ProductList/ProductList';
import LocationForm from '../components/OrderForm/OrderForm';
import AnimatedNumber from 'react-animated-number';
import OrderSummary from '../components/OderSummary/OrderSummary';
import OrderFullfilment from '../components/OrderFullfilment/OrderFullfilement';
import Link from 'umi/link';
import Redirect from 'umi/redirect';


const Order = ({ ui, books, order, user, stepForward, stepBackward,
                 freezeItems, clearOrderData, showLoginModal }) => {

  const { products, itemsInCart } = books;
  const { currentStep } = ui;
  const { paymentMethod } = order;
  const { userId, isLoggedIn } = user;
  const Step = Steps.Step;

  const inCart = products.filter(product => {
    return Object.keys(itemsInCart).includes(product.id.toString()) && itemsInCart[product.id] > 0;
  }).map(item => {
    return { ...item, ...{ quantity: itemsInCart[item.id] } };
  });


  const steps = [{
    title: <h4>Shopping cart summary</h4>,
    content:
      <div>
        <ProductList books={inCart}/>
        <AnimatedNumber
          component="h2"
          value={inCart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          style={{
            transition: '0.8s ease-out',
            transitionProperty: 'background-color, color, opacity',
          }}
          duration={300}
          formatValue={n => 'Total price: ' + n.toFixed(2).toString()}
        />
      </div>,
  }, {
    title: 'Delivery & Payment',
    content: <div>
      <LocationForm
        stepForward={stepForward}
        stepBackward={stepBackward}
        freezeItems={freezeItems}
        inCart={inCart}
      />
    </div>,
  }, {
    title: 'Summary',
    content: <OrderSummary/>,
  },
    (paymentMethod !== null && paymentMethod.name === 'Przelew online' ?
      {
        title: 'Pay & Order',
        content: '501- There would be an integration with external payment system',
      }
      :
      {
        title: 'Order',
        content: <OrderFullfilment/>,
      })];

  if (!isLoggedIn) showLoginModal();

  return (
    <React.Fragment>
      {isLoggedIn ?
        <CardCenteredLayout
          maxWidth={1200}
          title={
            <Steps current={currentStep}>
              {steps.map(item => <Step key={item.title} title={item.title}/>)}
            </Steps>
          }
        >
          <div>
            {steps[currentStep].content}
          </div>
          <div
            style={{
              float: 'right',
              margin: '3em -1em 0.5em 0',
            }}
          >
            <Button.Group
              style={{
                transform: 'translate(-30px)',
              }}
            >
              {currentStep > 0 && currentStep !== 1 &&
              (<Button
                style={{ minWidth: 100 }}
                htmlType="button"
                onClick={stepBackward}
              >
                Previous
              </Button>)}
              {currentStep < steps.length - 1 && currentStep !== 1 &&
              <Button
                type="primary"
                style={{ minWidth: 100 }}
                htmlType="button"
                onClick={stepForward}
              >
                Next
              </Button>}
              {currentStep === steps.length - 1 &&
              <Link
                to={'/users/' + userId}
              >
                <Button
                  type="primary"
                  style={{ minWidth: 100 }}
                  htmlType="button"
                >
                  Done
                </Button>
              </Link>}
            </Button.Group>
          </div>
        </CardCenteredLayout>
        :
        <Redirect to={'/'}/>}
    </React.Fragment>
  );
};

export default connect(
  ({ books, ui, order, user }) => ({ books, ui, order, user }),
  dispatch => ({
    stepForward: () => dispatch({ type: 'ui/stepForward' }),
    stepBackward: () => dispatch({ type: 'ui/stepBackward' }),
    freezeItems: inCard => dispatch({ type: 'order/freezeItems', payload: inCard }),
    showLoginModal: () => dispatch({ type: 'ui/showLoginModal' }),
  }))
(Order);
