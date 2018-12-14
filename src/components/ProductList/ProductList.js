import React from 'react';
import { Card, Icon, Tag } from 'antd';
import styles from  './ProductList.css'

const ProductList = ({ onDelete, products, loading }) => {
  const { Meta } = Card;

  const colors = ['cyan', 'magenta', 'geekblue', 'volcano', 'gold', 'green', 'purple', 'blue'];
  const mock = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  if (loading)
    return (
      <div
        style={{ maxWidth: 1200, margin: 'auto', display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', textAlign: 'center' }}
      >
        {mock.map(_ =>
          <Card
            headStyle={{ color: 'rgba(0, 0, 0, 0.4)' }}
            style={{ width: 170, margin: 4 }}
            loading={true}
            active={true}
            title={'...'}
            actions={['']}
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
      }}>
        {products.map(product =>
          <Card
            className={styles['card']}
            key={product.id}
            style={{ width: 180, margin: 5, fontStyle: 'italic' }}
            cover={
            <div>
              <img src={product.mianiature} alt="cover"
                             style={{width:110, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 15, borderRadius: 5 }} />
              { product.tags.sort((a, b) => b.length - a.length).map((tag, index) =>
                  <Tag color={colors[index % colors.length]}
                       style={{ width: 70, position: 'absolute', top: 20 + 25 * index, left: 3, fontSize: 10 }}
                  >
                    {tag}
                  </Tag>)}
            </div>}
            actions={[<div><Icon type="shopping-cart"/><span> Dodaj do koszyka</span></div>]}
          >
            <Meta
              title={product.title}
              description={<React.Fragment><span>{product.author}</span><br/><span>{product.price}</span></React.Fragment>}
            />
          </Card>)}
      </div>
    );
};

export default ProductList;
