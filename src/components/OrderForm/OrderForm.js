import { Form, Input, Button, Radio, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';


class OrderForm extends React.Component {

  componentDidMount() {
    if (this.props.deliveryMethodOptions.length === 0) {
      this.props.dispatch({
        type: 'order/fetchDeliveryMethodOptions',
      });
    }
    if (this.props.paymentMethodOptions.length === 0) {
      this.props.dispatch({
        type: 'order/fetchPaymentMethodOptions',
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const location = {
          place: values.place,
          streetName: values.streetName,
          streetNumber: values.streetNumber,
          flatNumber: values.flatNumber,
          zipCode: values.zipCode,
        };
        this.props.dispatch({
          type: 'order/saveLocation',
          payload: location,
        });
        this.props.dispatch({
          type: 'order/saveDeliveryMethod',
          payload: this.props.deliveryMethodOptions.filter(deliveryMethod => deliveryMethod.name === values.deliveryMethod)[0],
        });
        this.props.dispatch({
          type: 'order/savePaymentMethod',
          payload: this.props.paymentMethodOptions.filter(paymentMethod => paymentMethod.name === values.paymentMethod)[0],
        });
        this.props.freezeItems(this.props.inCart);
        this.props.stepForward();
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{
          marginTop: '1.5em',
        }}
      >
        <Form.Item
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4, offset: 4 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 10 },
          }}
          label="Place"
        >
          {getFieldDecorator('place', {
            validateFirst: true,
            validateTrigger: 'onBlur',
            initialValue: this.props.location.place,
            rules: [{
              required: true, message: 'Field required',
            }],
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4, offset: 4 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 10 },
          }}
          label="Street name"
        >
          {getFieldDecorator('streetName', {
            validateFirst: true,
            validateTrigger: 'onBlur',
            initialValue: this.props.location.streetName,
            rules: [{
              required: true, message: 'Field required',
            }],
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4, offset: 4 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 6 },
          }}
          label="Street number"
        >
          {getFieldDecorator('streetNumber', {
            validateFirst: true,
            validateTrigger: 'onBlur',
            initialValue: this.props.location.streetNumber,
            rules: [{
              required: true, message: 'Field required',
            }],
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4, offset: 4 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 6 },
          }}
          label="Flat number"
        >
          {getFieldDecorator('flatNumber', {
            initialValue: this.props.location.flatNumber,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4, offset: 4 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 6 },
          }}
          label="Zip code"
        >
          {getFieldDecorator('zipCode', {
            validateFirst: true,
            validateTrigger: 'onBlur',
            initialValue: this.props.location.zipCode,
            rules: [{
              required: true, message: 'Field required',
            }],
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4, offset: 0 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 20 },
          }}
          label="Delivery methods"
        >
          {getFieldDecorator('deliveryMethod', {
            initialValue: this.props.deliveryMethod !== null ? this.props.deliveryMethod.name : '',
            validateTrigger: 'onBlur',
            rules: [{
              required: true, message: 'You need to choose delivery method',
            }],
          })(
            <Radio.Group>
              {this.props.deliveryMethodOptions.map(deliveryMethod =>
                <Radio.Button
                  value={deliveryMethod.name}
                  checked={this.props.deliveryMethod !== null && deliveryMethod.name === this.props.deliveryMethod.name}
                >
                <span>
                  {deliveryMethod.name} - ${deliveryMethod.cost}
                </span>
                </Radio.Button>,
              )}
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item
          labelCol={{
            xs: { span: 24 },
            sm: { span: 4, offset: 0 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 20 },
          }}
          label="Payment methods"
        >
          {getFieldDecorator('paymentMethod', {
            initialValue: this.props.paymentMethod !== null ? this.props.paymentMethod.name : '',
            validateTrigger: 'onBlur',
            rules: [{
              required: true, message: 'You need to choose payment method',
            }],
          })(
            <Radio.Group>
              {this.props.paymentMethodOptions.map(paymentMethod =>
                <Radio.Button
                  value={paymentMethod.name}
                  checked={this.props.paymentMethod !== null && paymentMethod.name === this.props.paymentMethod.name}
                >
                  {paymentMethod.name === 'Przelew online' ?
                  <Tooltip
                    title='More options in "Order & Pay" step'
                  >
                    <span>
                      {paymentMethod.name}
                    </span>
                  </Tooltip>
                    :
                  <span>
                    {paymentMethod.name}
                  </span>}
                </Radio.Button>,
              )}
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item>
          <Button.Group
            style={{
              float: 'right',
              margin: '3em -1em 0.5em 0',
              transform: 'translate(-30px)'
            }}
          >
            <Button
              tyle={{ minWidth: 100 }}
              htmlType="button"
              onClick={this.props.stepBackward}
            >
              Previous
            </Button>
            <Button
              style={{ minWidth: 100 }}
              htmlType="submit"
              type="primary"
            >
              Next
            </Button>
          </Button.Group>
        </Form.Item>
      </Form>
    );
  }
}


export default connect(({ order }) => order)(Form.create()(OrderForm));
