import { Form, Input, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';


class LocationForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let location = values;
        this.props.dispatch({
          type: 'order/saveLocation',
          payload: location
        });
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
        <Form.Item>
          <Button.Group
            style={{
              float: 'right',
              margin: '3em -1em 0.5em 0'
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


export default connect(({ order }) => order)(Form.create()(LocationForm));
