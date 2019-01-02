import { Card } from 'antd';
import React from 'react';


const CardCenteredLayout = ({title, children, tabList, onTabChange}) => {

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          flexGrow: 1,
        }}
      >
      </div>
      <Card
        style={{
          flexGrow: 4,
          minWidth: 340,
          maxWidth: 1200,
          minHeight: '80vh',
        }}
        title={title}
        tabList={tabList}
        onTabChange={onTabChange}
      >
        {children}
      </Card>
      <div
        style={{
          flexGrow: 1,
        }}
      >
      </div>
    </div>
  );

};

export default CardCenteredLayout;
