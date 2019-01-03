import { Skeleton, Card } from 'antd';
import React from 'react';


const BookSkeleton = () => {

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '50%',
          }}
        >
          <div
            style={{
              margin: 50,
              maxHeight: 520,
              maxWidth: 390,
              minWidth: 100,
              width: '100%',
              height: '100%',
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.01)',
              border: '1px solid rgba(0, 0, 0, 0.3)'
            }}
          >
          </div>
        </div>
        <div
          style={{
            width: '50%',
            margin: 50,
            marginRight: 100,
            height: 400,
          }}
        >
          <Skeleton paragraph={{ rows: 11 }} active title={null}/>
        </div>
      </div>
      <div
        style={{
          margin: 20
        }}
      >
        <Skeleton paragraph={{ rows: 4 }} active title={null}/>
      </div>
    </React.Fragment>
  );
};

export default BookSkeleton;
