import React from 'react';
import { connect } from 'dva';
import CardCenteredLayout from '../../components/CardCenteredLayout/CardCenteredLayout';
import Redirect from 'umi/redirect';
import ClientInfo from '../../components/ClientInfo/ClientInfo';

let UserPage = ({ dispatch, ui, user }) => {

  const { currentTab } = ui;
  const { name, surname, isLoggedIn } = user;

  const tabList = [{
    key: 'tab1',
    tab: 'Your profile',
  }, {
    key: 'tab2',
    tab: 'Your orders',
  }];

  const contentList = {
    tab1: <ClientInfo client={user}/>,
    tab2: <p>here be order history</p>,
  };


  if (!isLoggedIn) dispatch({ type: 'ui/showLoginModal' });
  return (
    <React.Fragment>
    {
      isLoggedIn ?
        <CardCenteredLayout
          maxWidth={1200}
          title={`Hello, ${name} ${surname}`}
          tabList={tabList}
          onTabChange={key => {
            dispatch({
              type: 'ui/changeTab',
              payload: key,
            })
          }}
          defaultActiveKey="tab2"
        >
          <br/>
          {contentList[currentTab]}
        </CardCenteredLayout>
        :
        <Redirect to={'/'}/>
    }
    </React.Fragment>
  );
};


export default connect(({ ui, user }) => ({ ui, user }))(UserPage);
