import Link from 'umi/link';
import { Tag, Divider, Button } from 'antd';
import React from 'react';
import { Icon } from 'antd';
import DiscountTag from '../DisocuntTag/DiscountTag';
import BookPriceSpan from '../BookPriceSpan/BookPriceSpan';

const BookInfo = ({book, dispatch}) => {

  return (
    <React.Fragment>
      <div style={{ fontSize: '1.1em' }}>
        <div>
          {'ISBN number: ' + book.ISBN}</div>
        <div>
          {'Title: ' + book.title}</div>
        <div>
          {book.publishers.length > 1 ? 'Publishers: ' : 'Publisher: '}
          {book.publishers.map(publisher =>
            <Link
              to={'/search?publisher=' + publisher.name}
              style={{ color: 'rgba(0,0,0,0.9)',
                fontWeight: 480 }}
            >
              {publisher.name}
            </Link>)
          }
        </div>
        <div>
          {book.authors_names.length > 1 ? 'Authors: ' :  'Author: '}
          {book.authors_names.map((author_name, idx) =>
            <Link
              to={'/search?authors_name=' + author_name.name}
              style={{ color: 'rgba(0,0,0,0.9)', fontWeight: 480 }}
            >
             {(idx ? ', ' : '')}{author_name.name}
            </Link>)
          }
        </div>
        <div>
          Price: <BookPriceSpan book={book}/>
        </div>
        <div>
          {'Release date: ' + book.release_date}
        </div>
        <div style={{ padding: '5px 0 0 0' }}>
          {'Genres: '}
          {book.genres.map(genre =>
            <Tag>
              <Link
                to={'/search?genre=' + genre.name}
                style={{ color: 'rgba(0,0,0,0.8)', fontWeight: 480 }}
              >
                {genre.name}
              </Link>
            </Tag>)}
        </div>
        {book.tags.length > 0 ?
            <div style={{ padding: '5px 0 0 0' }}>
              {'Tags: '}
              {book.tags.map(tag =>
                <Tag>
                  <Link
                    to={'/search?tag=' + tag.tag}
                    style={{ color: 'rgba(0,0,0,0.8)', fontWeight: 500 }}
                  >
                    {tag.tag}
                  </Link>
                </Tag>)}
            </div>
            :
            null}
        {book.pricing.product_pricing_valid_until || book.pricing.category_discount_valid_until ?
            <DiscountTag book={book} absolute={false}/>
        : null}
      </div>
      <Divider/>
      <div style={{ fontSize: '1.2em' }}>
        <div>
          <Icon style={{ fontSize: '1.4em' }} type="inbox"/>{' In Stock: ' + book.number_in_stock}
        </div>
        <div>
          <br/>
          <Icon style={{ fontSize: '1.4em' }} type="rocket"/> Order today, get tommorow!
        </div>
      </div>
      <Divider/>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button
          htmlType="primary"
          block
          style={{
            float: 'bottom'
          }}
          onClick={() => {
            dispatch({
              type: 'shoppingCart/add',
              payload: book,
            });
          }}
        >
          <Icon type="shopping-cart"/>
          <span> add to shopping cart</span>
        </Button>
      </div>
    </React.Fragment>
  );
};

export default BookInfo;
