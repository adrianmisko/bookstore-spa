import { connect } from 'dva';
import React from 'react';
import CardCenteredLayout from '../../components/CardCenteredLayout/CardCenteredLayout';
import { Card } from 'antd';

const Book = ({ dispatch, book, loading }) => {

  return (
    <CardCenteredLayout
      title={book !== null ? book.title : null}
    >
      {book !== null ?
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
              <img
                src={book.covers[0].path}
                alt={'cover'}
                style={{
                  margin: 20,
                  maxHeight: 390,
                  maxWidth: 292,
                  minWidth: 100,
                  width: '100%',
                  borderRadius: 10,
                }}
              />
            </div>
            <div
              style={{
                width: '50%',
                margin: 20,
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
              margin: 20,
            }}
          >
            <h3>Description</h3>
            <div>{book.description}</div>
          </div>
        </React.Fragment>
        :
        <p>content</p>
      }
    </CardCenteredLayout>
  );
};

export default connect(({ book }) => book)(Book);
