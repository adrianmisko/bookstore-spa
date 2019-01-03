import React from 'react';
import { Divider, Carousel, Comment, Collapse } from 'antd';

const BookDetails = ({ dispatch, book }) => {

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '50%',
          }}
        >
          <div
            style={{
              margin: 50,
              marginTop: 40,
              maxHeight: 520,
              maxWidth: 390,
              minWidth: 100,
              width: '100%',
              borderRadius: 10,
            }}
          >
            <Carousel
              autoplay={book.covers.length > 1}
              autoplaySpeed={5000}
            >
              {book.covers.map(cover =>
                <img
                  src={cover.path}
                  alt="cover"
                />,
              )}
            </Carousel>
          </div>
        </div>
        <div
          style={{
            width: '50%',
            margin: 70,
            marginTop: 40,
          }}
        >
          <div>{'Title: ' + book.title}</div>
          <br/>
          <div>
            {book.authors_names.length > 1 ? 'Authors: ' : 'Author: '}
            {book.authors_names.map((author, idx) => <span>{(idx ? ', ' : '')} {author.name}</span>)}
          </div>
          <br/>
          <div>{'Price: ' + book.price}</div>
          <br/>
          <div>
            {'Genres: '}
            {
              book.genres.map((genre, idx) => <span>{(idx ? ', ' : '')} + {genre.name}</span>)
            }
          </div>
          <br/>
        </div>
      </div>
      <div
        style={{
          margin: 50,
        }}
      >
        <br/>
        <h3>Description</h3>
        <div>{book.description}</div>
      </div>
      <Collapse
        bordered={false}
        onChange={() => dispatch({ type: 'book/fetchReviews', payload: book.id })}
      >
        <Collapse.Panel
          header="See the reviews"
          key="1"
          style={{
            border: 0
          }}
        >
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
          <p>asdsad</p>
        </Collapse.Panel>
      </Collapse>
    </React.Fragment>
  );
};

export default BookDetails;
