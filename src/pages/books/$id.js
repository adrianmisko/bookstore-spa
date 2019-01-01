import { connect } from 'dva';
import React from 'react';
import { Card, Spin, Icon } from 'antd';

const Book = ({ dispatch, book, loading }) => {

  return (
    <Spin
      spinning={loading}
      indicator={
        <Icon
          type="loading"
          spin={true}
          style={{
            fontSize: '5em',
            position: 'absolute',
            transform: 'translate(-0.25em, 0)',
          }}
        />}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            flexGrow: 1,
          }}
        >
        </div>
        <Card
          style={{
            flexGrow: 4,
            minWidth: 340,
            minHeight: '80vh',
          }}
          title={book.title}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
            style={{
              width: '50%'
            }}
            >
              <img
                src={book.cover}
                alt={'cover'}
                style={{
                  margin: 20,
                  maxHeight: 390,
                  maxWidth: 292,
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
              <div>{'Price: ' + book.base_price}</div>
              <br/>
              <div>
                {'Genres: '}
                {book.genres.map((genre, idx) => <span>{(idx ? ', ' : '')} + {genre.name}</span>)}
              </div>
              <br/>
            </div>
          </div>
          <div
            style={{
              margin: 20
            }}
          >
            <h3>Description</h3>
            <div>{book.description}</div>
          </div>
        </Card>
        <div
          style={{
            flexGrow: 1,
          }}
        >
        </div>
      </div>
    </Spin>
  );
};

export default connect(({ book }) => book)(Book);
