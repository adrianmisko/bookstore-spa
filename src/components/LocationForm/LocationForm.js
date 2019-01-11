import {
  Form, Input, Button, Spin, Icon,
} from 'antd';
import React from 'react';
import { connect } from 'dva';


class LocationForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <Form
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
          {getFieldDecorator('flatNumber', {})(
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
            rules: [{
              required: true, message: 'Field required',
            }],
          })(
            <Input/>,
          )}
        </Form.Item>
      </Form>
    );
  }
}


export default connect(({ order }) => order)(Form.create()(LocationForm));
