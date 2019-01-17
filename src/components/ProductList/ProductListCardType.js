import React from 'react';
import { Card } from 'antd';
import BookCard from '../BookCard/BookCard';

const ProductListCardType = ({ dispatch, products, loading }) => {

  const mock = Array(12).fill(0);

  if (loading)
    return (
      <div
        style={{
          maxWidth: 1100,
          margin: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {mock.map(_ =>
          <Card
            headStyle={{
              color: 'rgba(0, 0, 0, 0.4)'
            }}
            style={{
              width: 170,
              height: 280,
              margin: 4
            }}
            loading={true}
            active={true}
            hoverable={true}
          >
          </Card>)}
      </div>
    );
  else
    return (
        <div style={{
        maxWidth: 1200,
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
      }}>
        {products.map(product =>
          <BookCard
            dispatch={dispatch}
            book={product}
          />
        )}
      </div>
    );
};

export default ProductListCardType;
