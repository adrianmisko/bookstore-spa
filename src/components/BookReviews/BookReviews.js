import { Comment, List, Tooltip, Skeleton, Icon, Rate, Divider } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { MD5 } from 'crypto-js';

const BookReviews = ({ reviews, loadingReviews }) => {

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
          <div>There aren't any reviews yet</div>
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
                    <span>
                      <Tooltip title="Like">
                        <Icon type="like" style={{ marginLeft: 5 }} />
                      </Tooltip>
                      <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                        {item.upvotes}
                      </span>
                    </span>,
                    <span>
                      <Tooltip title="Dislike">
                        <Icon type="dislike"/>
                      </Tooltip>
                      <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                        {item.downvotes}
                      </span>
                    </span>
                  ]}
                  author={item.author}
                  avatar={`https://www.gravatar.com/avatar/${MD5(item.author)}?d=identicon&s=50`}
                  content={item.body}
                  datetime={Date()}
                />
              }
            />
          </React.Fragment>
        }
      </React.Fragment>
    }
    </div>
  );

};

export default connect(({book}) => book)(BookReviews);;;;
