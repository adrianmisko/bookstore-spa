import React from 'react';
import Media from 'react-media';

const BookDetailsLayout = ({ description, images, bookInfo }) => {

  return (
    <Media query={{ minWidth: 500 }}>
      {
      matches => matches ?
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
                    margin: 40,
                    marginTop: 25,
                    padding: 10,
                    maxHeight: 520,
                    maxWidth: 390,
                    minWidth: 80,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {images}
                </div>
              </div>
              <div
                style={{
                  width: '50%',
                  padding: 50,
                  paddingTop: 35,
                }}
              >
                {bookInfo}
              </div>
            </div>
            <div
              style={{
                margin: 40
              }}
            >
              {description}
            </div>
          </React.Fragment>
            :
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
                    margin: 10,
                    marginTop: 5,
                    padding: 5,
                    maxHeight: 520,
                    maxWidth: 390,
                    minWidth: 70,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {images}
                </div>
              </div>
              <div
                style={{
                  width: '50%',
                  padding: '5px 0px 0px 15px'
                }}
              >
                {bookInfo}
              </div>
            </div>
            <div
              style={{
                margin: 10,
                marginTop: 15
              }}
            >
              {description}
            </div>
          </React.Fragment>
        }
    </Media>
  );

};

export default BookDetailsLayout;
