import { Comment, List, Tooltip, Skeleton, Icon, Rate, Divider, Collapse } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { MD5 } from 'crypto-js';
import BookReviewForm from '../BookReviewForm/BookReviewForm';
import moment from 'moment';

const BookReviews = ({ reviews, loadingReviews, dispatch, liked, disliked }) => {

  const mock = Array(3).fill(0);

  return (
    <div>
    {loadingReviews ?
      <React.Fragment>
        <br/>
        {mock.map(_ => <Skeleton active title={null} paragraph={{ rows: 3 }} avatar/>)}
      </React.Fragment>
      :
      <React.Fragment>
        {reviews.length === 0 ?
          <Collapse
            bordered={false}
          >
            <Collapse.Panel
              style={{
                border: 0,
              }}
              showArrow={false}
              header={<span>There aren't any reviews yet, <a>be the first one!</a></span>}
              key="1"
            >
              <BookReviewForm/>
            </Collapse.Panel>
          </Collapse>
          :
          <React.Fragment>
            <List
              itemLayout="horizontal"
              header={reviews.length + ' ' + (reviews.length === 1 ? 'review' : 'reviews')}
              dataSource={reviews}
              renderItem={item =>
                <Comment
                  actions={[
                    <Rate
                      allowHalf
                      disabled
                      value={item.mark / 2}
                      defaultValue={0}
                      style={{ fontSize: '1em', marginLeft: '-40px' }}
                    />,
                    <Divider type="vertical"/>,
                    <span
                      onClick={() => dispatch({ type: 'book/upvoteReview', payload: item.id })}
                    >
                      <Tooltip title="Like">
                        <Icon type="like" style={{ marginLeft: 5 }} theme={liked.includes(item.id) ? 'filled' : 'outlined' }/>
                      </Tooltip>
                      <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                        {item.upvotes}
                      </span>
                    </span>,
                    <span
                      onClick={() => dispatch({ type: 'book/downvoteReview', payload: item.id })}
                    >
                      <Tooltip title="Dislike">
                        <Icon type="dislike" theme={disliked.includes(item.id) ? 'filled' : 'outlined'}/>
                      </Tooltip>
                      <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                        {item.downvotes}
                      </span>
                    </span>
                  ]}
                  author={item.author}
                  avatar={`https://www.gravatar.com/avatar/${MD5(item.author)}?d=identicon&s=50`}
                  content={item.body}
                  datetime={<Tooltip
                    title={moment(item.posted_on).format('MMMM Do YYYY')}
                  >
                    {moment(item.posted_on, "YYYYMMDD").fromNow()}
                  </Tooltip>}
                />
              }
            />
            <Collapse
              bordered={false}
            >
              <Collapse.Panel
                style={{
                  border: 0,
                }}
                header={<span><a>Write a review</a></span>}
                key="1"
              >
                <BookReviewForm/>
              </Collapse.Panel>
            </Collapse>
          </React.Fragment>
        }
      </React.Fragment>
    }
    </div>
  );

};

export default connect(({book}) => book)(BookReviews);
