import React from 'react';
import { connect } from 'dva';
import CardCenteredLayout from '../../components/CardCenteredLayout/CardCenteredLayout';
import Redirect from 'umi/redirect';
import ClientInfo from '../../components/ClientInfo/ClientInfo';
import OrderList from '../../components/OrdersList/OrdersList';


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
    tab1: <ClientInfo />,
    tab2: <OrderList />
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
          defaultActiveTabKey={currentTab}
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
