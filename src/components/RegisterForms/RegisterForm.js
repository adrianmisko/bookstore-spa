import {
  Form, Input, Select, Checkbox, Button, AutoComplete, Spin, Icon,
} from 'antd';
import React from 'react';
import { connect } from 'dva';


const { Option } = Select;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    validatingEmail: false,
    validatingPhoneNumber: false
  };

  handleAutocomplete = value => {
    let autoCompleteResult;
    if (!value || value.indexOf('@') >= 0) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['gmail.com', 'wp.pl', 'o2.pl'].map(domain => `${value}@${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/submitRegistrationForm',
          payload: { form: this.props.form, values }
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords are inconsistent');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.props.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  validateEmail = (rule, value, callback) => {
    this.setState({ ...this.state, validatingEmail: true });
    const body = JSON.stringify({ email: value });
    fetch('https://bookstore-flask.herokuapp.com/api/emails/validate',
      {
        method: 'POST',
        mode: 'cors',
        body,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data['valid e-mail'] === true)
          callback();
        else
          callback(data.email[0]);
        this.setState({ ...this.state, validatingEmail: false });
      })
      .catch(_ => {
        callback('Internal server error :(');
        this.setState({ ...this.state, validatingEmail: false });
      });
  };


  validatePhoneNumber = (rule, value, callback) => {
    this.setState({ ...this.state, validatingPhoneNumber: true });
    const body = JSON.stringify({ phone_number: value });
    fetch( 'https://bookstore-flask.herokuapp.com/api/phone_number/validate',
      {
        method: 'POST',
        mode: 'cors',
        body,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data['valid phone number'] === true)
          callback();
        else
          callback(data.phone_number[0]);
        this.setState({ ...this.state, validatingPhoneNumber: false });
      })
      .catch(_ => {
        callback('Internal server error :(');
        this.setState({ ...this.state, validatingPhoneNumber: false });
      });
  };

  render() {
    const { autoCompleteResult } = this.state;
    const options = autoCompleteResult.map(email => <Option key={email}>{email}</Option>);

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '48',
    })(
      <Select style={{ width: 70 }}>
        <Option value="48">+48</Option>
        <Option value="">+00</Option>
      </Select>,
    );


    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="E-mail"
        >
          <Spin
            spinning={this.state.validatingEmail}
            indicator={<Icon type="loading" style={{ fontSize: 22 }} spin/>}
          >
            {getFieldDecorator('email', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [{
                type: 'email', message: 'The input is not valid e-mail',
              }, {
                required: true, message: 'Please input your e-mail',
              }, {
                validator: this.validateEmail,
              }],
            })(
              <AutoComplete
                onSearch={this.handleAutocomplete}
              >
                {options}
              </AutoComplete>,
            )}
          </Spin>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            validateTrigger: 'onBlur',
            validateFirst: true,
            rules: [{
              required: true, message: 'Please input your password',
            }, {
              validator: this.validateToNextPassword,
            }, {
              min: 8, message: 'Password has to be at least 8 characters long',
            }, {
              pattern: '(?=.*\\d)(?=.*[A-Z])',
              message: 'Password must contain at least one capital letter and one number',
            }],
          })(
            <Input type="password"/>,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur}/>,
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
              validateTrigger: 'onBlur',
              validateFirst: true,
              rules: [{
                required: true, message: 'Please input your phone number',
              },{
                pattern: '^[0-9]+$', message: 'Phone number cannot contain non-numeric characters',
              }, {
                validator: this.validatePhoneNumber
              }]
            })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>,
          )}
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', maxWidth: 300, margin: '0 auto', display: 'block' }}
        >
          Register
        </Button>
      </Form>
    );
  }
}


export default connect(({ ui }) => ui)(Form.create()(RegistrationForm));
