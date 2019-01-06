import { Icon, List } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import React from 'react';

const ResultsList = filtered => {

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }}/>
      {text}
    </span>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
      dataSource={filtered}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[<IconText type="shoppingCart" text="add to shopping cart"/>]}
          extra={<img width={272} alt="cover" src={item.covers[0].path}/>}
        >
          <List.Item.Meta
            title={
              <Link
                to={'/books/' + item.id.toString()}
                style={{ color: 'rgba(0,0,0,0.9)' }}
              >
                {item.title}
              </Link>
            }
            description={
              <React.Fragment>
                {item.authors_names.map((author_name, idx) =>
                  <span>
                    <Link to={'/search?author=' + author_name.name} style={{ color: 'rgba(0,0,0,0.70)' }}>
                     {(idx ? ', ' : '')}{author_name.name}
                    </Link>
                  </span>,
                )}
                <br/>
              </React.Fragment>
            }
          />
          <span>
            {item.price}
          </span>
        </List.Item>
      )}
    />
  );
};

export default connect(({ search }) => search)(ResultsList);
