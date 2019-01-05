import Link from 'umi/link';
import { Tag, Divider, Button } from 'antd';
import React from 'react';
import { Icon } from 'antd';

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
          {book.publishers.map(publisher => <span>{publisher.name}</span>)}
        </div>
        <div>
          {book.authors_names.length > 1 ? 'Authors: ' :  'Author: '}
          {book.authors_names.map((author_name, idx) =>
            <span>
          <Link
            to={'/books?author=' + author_name.name}
            style={{ color: 'rgba(0,0,0,0.70)', fontWeight: 500 }}
          >
            {(idx ? ', ' : '')}{author_name.name}
          </Link>
        </span>)}
        </div>
        <div>
          {'Price: ' + book.price}
        </div>
        <div>
          {'Release date: ' + book.release_date}
        </div>
        <div style={{ padding: '5px 0 0 0' }}>
          {'Genres: '}
          {book.genres.map(genre => <Tag>{genre.name}</Tag>)}
        </div>
        {
          book.tags.length > 0 ?
            <div style={{ padding: '5px 0 0 0' }}>
              {'Tags: '}
              {book.tags.map(tag => <Tag>{tag.tag}</Tag>)}
            </div>
            :
            null
        }
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
              type: 'books/addToCart',
              payload: book.id,
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