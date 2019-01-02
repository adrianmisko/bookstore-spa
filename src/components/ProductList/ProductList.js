import React from 'react';
import { Card, Icon, Tag } from 'antd';
import styles from  './ProductList.css'
import Link from 'umi/link';

const ProductList = ({ dispatch, products, loading }) => {

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
            <Link
              to={'books/' + product.id.toString()}
            >
            <div>
              <img src={product.cover} alt="cover"
                             style={{width:110, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 15, marginBottom: 10, borderRadius: 5 }} />
              { product.tags.sort((a, b) => b.tag.length - a.tag.length).map((tag, index) =>
                  <Tag color={colors[index % colors.length]}
                       style={{ width: 70, position: 'absolute', top: 20 + 25 * index, left: 3, fontSize: 10 }}
                  >
                    {tag.tag}
                  </Tag>)}
            </div>
            </Link>
            }
            actions={[
              <div onClick={() => {
                  dispatch({
                    type: 'books/addToCart',
                    payload: product.id,
                });
              }
              }>
                <Icon type="shopping-cart"/>
                <span> add to shopping cart</span>
              </div>
            ]}
          >
            <Meta
              title={
                <Link
                  to={'books/' + product.id.toString()}
                  style={{ color: 'rgba(0,0,0,0.9)' }}
                >
                  {product.title}
                </Link>
              }
              description={
                <React.Fragment>
                  {product.authors_names.map(author_name =>
                  <span>
                    <Link to={'search?author=' + author_name.name} style={{ color: 'rgba(0,0,0,0.70)' }} >
                      {author_name.name + ' '}
                    </Link>
                  </span>
                  )}
                  <br/>
                  <span>
                    {product.price}
                  </span>
                </React.Fragment>
                }
            />
          </Card>)}
      </div>
    );
};

export default ProductList;
