import {
  Form, Icon, Input, Button, Checkbox, Alert, message
} from 'antd';
import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';


class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/submitLoginForm',
          payload: values
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        {(this.props.errorMessage !== '') ?
          <Alert
            style={{ marginBottom: 30 }}
            message={this.props.errorMessage}
            closable={true}
            type="error"
            afterClose={ () => this.props.dispatch({ type: 'user/hideErrorNotification' }) }
          />
          :
          null
        }
        <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username (e-mail)" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} autoComplete={'current-password'} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a href="" style={{ float: 'right' }}>Forgot password</a>
          <Button type="primary" htmlType="submit" style={{ width: '100%'}}>
            Log in
          </Button>
          Or <Link to={'/register'} onClick={() => { this.props.dispatch({ type: 'ui/hideLoginModal' }) }}>register now!</Link>
        </Form.Item>
      </Form>
      </React.Fragment>
    );
  }
}

connect(({ ui }) => ui)(LoginForm);
export default connect(({user}) => user)(Form.create()(LoginForm));
