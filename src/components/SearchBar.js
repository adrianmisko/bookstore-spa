import React from 'react'
import { connect } from 'dva';
import { Form, Input, Icon, Button } from 'antd';

class SearchBar extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log(this.props);
      this.props.dispatch({
        type: 'books/get',
        payload: null,
      });
    });
  };

  render() {
    const FormItem = Form.Item;
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{ maxWidth:'100%', maxHeight:'100%', display: 'flex' }}>
        <FormItem
        >
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Type something!' }],
          })(
            <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'Title, author...'}/>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 10 }}
          >
            Search
          </Button>
        </FormItem>
      </Form>
    );
  };
};

export default connect(({ books }) => books)(Form.create()(SearchBar))
