import { Card } from 'antd';
import React from 'react';
import { connect } from 'dva';

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
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          flexGrow: 1
        }}
      >
      </div>
      <Card
        style={{
          flexGrow: 4,
          minWidth: 340,
        }}
        title={'Hello, user 1'}
        tabList={tabList}
        onTabChange={key => { dispatch({
          type: 'ui/changeTab',
          payload: key,
        }) }}
      >
        <br/>
        { contentList[currentTab] }
      </Card>
      <div
        style={{
          flexGrow: 1
        }}
      >
      </div>
    </div>
  );
};


export default connect(({ ui }) => ui)(UserPage);
