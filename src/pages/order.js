import React from 'react';
import { connect } from 'dva';
import { Button, Steps } from 'antd';
import CardCenteredLayout from '../components/CardCenteredLayout/CardCenteredLayout';
import ProductList from '../components/ProductList/ProductList';
import LocationForm from '../components/OrderForm/OrderForm';
import AnimatedNumber from 'react-animated-number';
import OrderSummary from '../components/OderSummary/OrderSummary';


const Order = ({ ui, books, stepForward, stepBackward }) => {

  const { products, itemsInCart } = books;
  const { currentStep } = ui;
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
    title: 'Delivery & Payment methods',
    content: <div>
      <LocationForm
        stepForward={stepForward}
        stepBackward={stepBackward}
      />
    </div>,
  }, {
    title: 'Summary',
    content: <OrderSummary/>,
  }, {
    title: 'Order & Pay',
    content: 'Last-content2',
  }];

  return (
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
        <Button.Group>
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
            <Button
              type="primary"
              style={{ minWidth: 100 }}
              htmlType="button"
            >
              Confirm
            </Button>}
        </Button.Group>
      </div>
    </CardCenteredLayout>
  );
};

export default connect(
  ({ books, ui }) => ({ books, ui }),
  dispatch => ({
    stepForward: () => dispatch({ type: 'ui/stepForward' }),
    stepBackward: () => dispatch({ type: 'ui/stepBackward' }),
  }))
(Order);
