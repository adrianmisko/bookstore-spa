import styles from './index.css';
import React from 'react';
import { Layout } from 'antd';
import withRouter from 'umi/withRouter';
import Nav from '../components/Nav'
import { connect } from 'dva';



let BasicLayout = props => {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header>
        <Nav />
      </Header>
      <Content>
        { props.children }
      </Content>
      <Footer style={{ backgroundColor: '#3333' }}>
        <h2 style={{ textAlign: 'center' }}>Footer</h2>
      </Footer>
    </Layout>
  );
};

export default withRouter(connect()(BasicLayout));
