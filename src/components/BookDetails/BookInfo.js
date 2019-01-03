import Link from 'umi/link';
import { Tag } from 'antd';
import React from 'react';


const BookInfo = book => {

  return (
    <div>
      <div>{'ISBN number: ' + book.ISBN}</div>
      <div>{'Title: ' + book.title}</div>
      <div>
        {book.publishers.length > 1 ? 'Publishers: ' : 'Publisher: '}
        {book.publishers.map(publisher => <span>{publisher.name}</span>)}
      </div>
      <div>
        {book.authors_names.length > 1 ? 'Authors: ' : 'Author: '}
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
  );
};

export default BookInfo;
