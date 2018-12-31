import {
  Form, Icon, Input, Button, Checkbox, Alert, Spin,
} from 'antd';
import React from 'react';
import { connect } from 'dva';


class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/hideErrorNotification'
        });
        this.props.dispatch({
          type: 'user/submitLoginForm',
          payload: { form: this.props.form, values }
        });
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
            rules: [{ required: true, message: 'Please input your email' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username (e-mail)" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
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
          <Spin
            spinning={this.props.isLoading}
            indicator={<Icon type="loading" style={{ fontSize: 22 }} spin/>}
          >
            <Button type="primary" htmlType="submit" style={{ width: '100%'}}>
              Log in
            </Button>
          </Spin>
          Or{' '}
          <a onClick={() => { this.props.dispatch({ type: 'ui/hideLoginModal' });
                              this.props.dispatch({ type: 'ui/showRegisterDrawer' }) } }
          >
             register now!
          </a>
        </Form.Item>
      </Form>
      </React.Fragment>
    );
  }
}

connect(({ ui }) => ui)(LoginForm);
export default connect(({user}) => user)(Form.create()(LoginForm));
