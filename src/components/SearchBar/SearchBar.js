import React from 'react'
import { connect } from 'dva';
import { Form, Input, Icon, Button } from 'antd';
import styles from '../Nav/Nav.css';

class SearchBar extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'books/fetchBooks',
          payload: {
            queryString: values.search,
          },
        });
        this.props.history.push('/search?query='+values.search);
      }
    });
  };

  render() {
    const FormItem = Form.Item;
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    return (
      <div
        style={{ paddingTop: 0 }}
        className={styles.searchBar}
      >
      <Form
        onSubmit={this.handleSubmit}
        style={{ paddingTop: '0.75em' }}
      >
        <FormItem
        >
          {getFieldDecorator('search', {
            rules: [{ required: true, message: 'Type something!' }],
          })(
            <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'Title, author...'}/>
          )}
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 10 }}
          >
            Search
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  };
};

export default connect(({ books }) => books)(Form.create()(SearchBar))
