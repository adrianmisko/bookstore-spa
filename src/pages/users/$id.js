import styles from './$id.css';
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
    <div className={styles.container}>
      <Card
        style={{ margin: 10 }}
        title={'Hello, user 1'}
        tabList={tabList}
        onTabChange={key => { dispatch({
          type: 'user/changeTab',
          payload: key,
        }) }}
      >
        <br/>
        { contentList[currentTab] }
      </Card>
    </div>
  );
};


export default connect(({ user }) => user)(UserPage);
