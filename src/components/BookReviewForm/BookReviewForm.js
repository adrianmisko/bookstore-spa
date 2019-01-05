import {
  Form, Icon, Input, Button, Rate
} from 'antd';
import React from 'react';
import { connect } from 'dva';

class BookReviewForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'book/sendReview',
          payload: {id: this.props.book.id, values, form: this.props.form}
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        style={{ marginTop: '1em' }}
      >
        <Form.Item>
          {getFieldDecorator('author', {
            validateTrigger: 'onBlur',
            validateFirst: true,
            rules: [{
              required: true, message: 'Please type in your nickname'
            }, {
              max: 128, message: 'Nickname cannot be longer than 128 characters'
            }],
          })(
            <Input
              style={{ float: 'left', width: '30%' }}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your nickname"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('body', {
            validateTrigger: 'onBlur',
            validateFirst: true,
            rules: [{
              required: true, message: 'Review cannot be empty'
            }, {
              min: 10, message: 'Review is too short, 10 characters minimum'
            }, {
              max: 4096, message: 'Review cannot be longer than 4096 characters'
            }],
          })(
            <Input.TextArea
              autosize={{ minRows: 4, maxRows: 8 }}
              placeholder="Write review here"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('mark', {
          })(
            <Rate allowHalf allowClear />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.props.reviewIsBeingSend}
            type="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ book }) => book)(Form.create()(BookReviewForm));
