import React from 'react';
import { Layout, Modal, Drawer } from 'antd';
import withRouter from 'umi/withRouter';
import Nav from '../components/Nav/Nav';
import LoginForm from '../components/LoginForms/LoginForm';
import RegisterForm from '../components/RegisterForms/RegisterForm';
import { connect } from 'dva';


const BasicLayout = props => {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header style={{ height: 48, marginBottom: 20 }}>
        <Nav currentKey={props.currentKey} dispatch={props.dispatch} history={props.history}/>
      </Header>
      <Content>
        <Modal
          width={400}
          title="Log in"
          visible={props.loginModalVisible}
          onCancel={() => props.dispatch({ type: 'ui/hideLoginModal' })}
          footer={null}
          maskClosable={true}
        >
          <LoginForm/>
        </Modal>
        <Drawer
          visible={props.registerDrawerVisible}
          width={600}
          placement={'right'}
          maskClosable={true}
          closable={false}
          onClose={() => props.dispatch({ type: 'ui/hideRegisterDrawer' })}
        >
          <RegisterForm/>
        </Drawer>
        {props.children}
      </Content>
      <Footer style={{ backgroundColor: '#3333', marginTop: 25 }}>
        <h2 style={{ textAlign: 'center' }}>Footer</h2>
      </Footer>
    </Layout>
  );
};

export default withRouter(connect(({ ui }) => ui)(BasicLayout));
