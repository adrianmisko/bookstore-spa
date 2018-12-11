import React from 'react';
import { Card, Icon } from 'antd';


const ProductList = ({ onDelete, products }) => {
  const { Meta } = Card;

  return(
    <div style={{ maxWidth: 1200, margin: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      { products.map(product => <Card
        title={product.name}
        extra={<a href="#">More</a>}
        style={{ width: 170, margin: 3 }}
        cover={<img alt="cover" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        actions={[<div><Icon type="shopping-cart" /><span> Dodaj do koszyka</span></div>]}
      >
      </Card>) }
    </div>
  )
};

export default ProductList;
