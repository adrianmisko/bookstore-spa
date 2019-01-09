import { Card } from 'antd';
import React from 'react';
import { connect } from 'dva';
import CardCenteredLayout from '../../components/CardCenteredLayout/CardCenteredLayout';

let UserPage = ({ currentTab, dispatch }) => {

  const tabList = [{
    key: 'tab1',
    tab: 'tab1',
  }, {
    key: 'tab2',
    tab: 'tab2',
  }];

  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };


  return (
    <CardCenteredLayout
      maxWidth={1200}
      title={'Hello, user 1'}
      tabList={tabList}
      onTabChange={key => { dispatch({
        type: 'ui/changeTab',
        payload: key,
      }) }}
    >
      <br />
      { contentList[currentTab] }
    </CardCenteredLayout>
  );
};


export default connect(({ ui }) => ui)(UserPage);
