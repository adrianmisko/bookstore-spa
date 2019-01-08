import React from 'react';
import { Card } from 'antd';

const PageSearchLayout = ({ FilterOptionsBar, ResultsList }) => {

  return (
    <div
      style={{
        minHeight: 600,
        display: 'flex'
      }}
    >
      <Card
        title="Filter"
        style={{
          width: '40%',
        }}
      >
        <FilterOptionsBar/>
      </Card>
      <Card
        title="Results"
        style={{
          width: '100%',
        }}
      >
        <ResultsList/>
      </Card>
    </div>
  );
};

export default PageSearchLayout;
