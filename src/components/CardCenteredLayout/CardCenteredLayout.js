import { Card } from 'antd';
import React from 'react';


const CardCenteredLayout = ({title, children, tabList, onTabChange, maxWidth}) => {

  return (
      <Card
        style={{
          margin: '5px auto',
          minWidth: 340,
          maxWidth: maxWidth,
          minHeight: '80vh',
        }}
        title={title}
        tabList={tabList}
        onTabChange={onTabChange}
      >
        {children}
      </Card>
  );

};

export default CardCenteredLayout;
