import React from 'react';
import { Carousel, Collapse } from 'antd';
import BookReviews from '../BookReviews/BookReviews';
import BookDetailsLayout from '../BookDetailsLayout/BookDetailsLayout';
import BookInfo from './BookInfo';

const BookDetails = ({ dispatch, book }) => {

  const images = <Carousel
    autoplay={book.covers.length > 1}
    autoplaySpeed={5000}
  >
    {book.covers.map(cover =>
      <img
        src={cover.path}
        alt="cover"
      />,
    )}
  </Carousel>;


  const description = <div>
    <h3>Description</h3>
    <div>
      {book.description}
    </div>
  </div>;

  return (
    <React.Fragment>
      <BookDetailsLayout
        images={images}
        bookInfo={BookInfo(book)}
        description={description}
      />
      <Collapse
        bordered={false}
        onChange={() => dispatch({ type: 'book/fetchReviews', payload: book.id })}
      >
        <Collapse.Panel
          header="See the reviews"
          key="1"
          style={{
            border: 0,
          }}
        >
         <BookReviews/>
        </Collapse.Panel>
      </Collapse>
    </React.Fragment>
  );
};

export default BookDetails;
