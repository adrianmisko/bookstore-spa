import styles from './index.css';
import React from 'react';
import { Layout } from 'antd';
import withRouter from 'umi/withRouter';
import Nav from '../components/Nav/Nav';
import SideNav from '../components/SideNav/SideNav';
import { connect } from 'dva';


const BasicLayout = props => {
  const { Header, Sider, Content, Footer } = Layout;

  const pathToRegexp = require('path-to-regexp');
  const re = pathToRegexp('/users/:id');
  const matches = re.exec(props.location.pathname);
  if (matches !== null)
    return (
      <Layout>
        <Header style={{ height: 48 }}>
          <Nav history={props.history}/>
        </Header>
        <Layout>
          <Sider>
            <SideNav history={props.history}></SideNav>
          </Sider>
        </Layout>
        <Content>
          {props.children}
        </Content>
        <Footer style={{ backgroundColor: '#3333'}}>
          <h2 style={{ textAlign: 'center' }}>Footer</h2>
        </Footer>
      </Layout>
    );
  else
    return (
      <Layout>
        <Header style={{ marginBottom: 20 }}>
          <Nav history={props.history}/>
        </Header>
        <Content>
          {props.children}
        </Content>
        <Footer style={{ backgroundColor: '#3333', marginTop: 25 }}>
          <h2 style={{ textAlign: 'center' }}>Footer</h2>
        </Footer>
      </Layout>
    );
};

export default withRouter(connect()(BasicLayout));
