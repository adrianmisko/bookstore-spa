import styles from '../ProductList/ProductListCardType.css';
import DiscountTag from '../DisocuntTag/DiscountTag';
import Link from 'umi/link';
import { Card, Icon, Tag } from 'antd';
import React from 'react';


const BookCard = ({ book, dispatch }) => {

  const colors = {
    'Set text': 'rgba(10, 50, 88, 1)',
    'New': '#2db7f5',
    'Bestseller': '#87d068',
    'Promotion': '#ffff',
  };


  return (
    <Card
      className={styles['card']}
      key={book.id}
      style={{ width: 180, height: '100%', margin: 5, fontStyle: 'italic' }}
      cover={
        <Link
          to={'/books/' + book.id.toString()}
        >
          <div>
            <img src={book.cover} alt="cover"
                 style={{
                   width: 110,
                   height: 150,
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   marginTop: 15,
                   marginBottom: 10,
                   borderRadius: 5,
                 }}/>
            {book.tags.sort((a, b) => b.tag.length - a.tag.length).map((tag, index) =>
              <Link to={'/search?tag=' + tag.tag}>
                <Tag color={colors[tag.tag]}
                     style={{ width: 70, position: 'absolute', top: 20 + 25 * index, left: 3, fontSize: 10 }}
                >
                  {tag.tag}
                </Tag>
              </Link>)}
            {book.pricing.product_pricing_valid_until || book.pricing.category_discount_valid_until ?
              <DiscountTag book={book} absolute/>
              :
              null
            }
          </div>
        </Link>
      }
      actions={[
        <div onClick={() => {
          dispatch({
            type: 'books/addToCart',
            payload: book.id,
          });
        }
        }>
          <Icon type="shopping-cart"/>
          <span> Add to shopping cart</span>
        </div>,
      ]}
    >
      <Card.Meta
        title={
          <Link
            to={'/books/' + book.id.toString()}
            style={{ color: 'rgba(0,0,0,0.9)' }}
          >
            {book.title}
          </Link>
        }
        description={
          <React.Fragment>
            {book.authors_names.map((author_name, idx) =>
              <span>
                    <Link to={'/search?authors_name=' + author_name.name} style={{ color: 'rgba(0,0,0,0.70)' }}>
                     {(idx ? ', ' : '')}{author_name.name}
                    </Link>
                  </span>,
            )}
            <br/>
            {book.pricing.product_pricing_valid_until || book.pricing.category_discount_valid_until ?
              <span>
                <span style={{ textDecoration: 'line-through', marginRight: '0.5em' }}>
                  ${book.pricing.base_price}
                </span>
                <span style={{ fontSize: '1.2em', color: 'rgba(0,0,0,0.7)' }}>
                  ${book.pricing.price}
                </span>
              </span>
              :
              <span>
                ${book.pricing.price}
              </span>}
          </React.Fragment>
        }
      />
    </Card>
  );
};

export default BookCard;
