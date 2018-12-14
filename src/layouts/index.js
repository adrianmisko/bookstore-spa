import styles from './index.css';
import React from 'react';
import { Layout } from 'antd';
import withRouter from 'umi/withRouter';
import Nav from '../components/Nav/Nav';
import { connect } from 'dva';


const BasicLayout = props => {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header style={{ marginBottom: 20 }}>
        <Nav history={props.history}/>
      </Header>
      <Content>
        { props.children }
      </Content>
      <Footer style={{ backgroundColor: '#3333', marginTop: 25 }}>
        <h2 style={{ textAlign: 'center' }}>Footer</h2>
      </Footer>
    </Layout>
  );
};

export default withRouter(connect()(BasicLayout));
