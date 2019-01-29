import styles from '../components/Carousel3D/Carousel3D.css';
import React from 'react';
import { connect } from 'dva';
import Carousel3d from '../components/Carousel3D/Carousel3D';
import ProductListCardType from '../components/ProductList/ProductListCardType';


const Index = ({ dispatch, products, featured, loading }) => {

  return (
    <React.Fragment>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '3em'
        }}
      >
        Featured books
      </h1>
      <div className={styles['carousel-demo-wrapper']}>
        <Carousel3d className={styles['carousel-demo']} childMaxLength={6}>
          {featured.slice(0, 6).map((book, i) => (
            <div
              onClick={() => { window.location.href = `${window.location}books/${book.id}`}}
              key={i.toString()}
              className={styles['img-wrapper']}
              style={{
                backgroundImage: `url(${book.cover})`,
              }}
            >
            </div>
          ))}
        </Carousel3d>
      </div>
      {products !== undefined ? <ProductListCardType dispatch={dispatch} products={products} loading={loading}/>
        : null}
    </React.Fragment>
  );
};


export default connect(({ books }) => books)(Index);
