import React from 'react';
import { List, Avatar } from 'antd';

const ItemsOrdered = ({ items }) => {

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar shape="square" style={{ height: 90, width: 60 }} size="large" src={item.cover} />}
            title={item.title}
            description={<div>
              {item.authors_names.map((author_name, idx) => ((idx ? ', ' : '') + author_name.name ))}
              <br />
              <span>Quantity: {item.quantity}</span>
            </div>}
          />
          <span>Price: ${(item.quantity * item.price).toFixed(2)}</span>
        </List.Item>
      )}
    />
  );
};

export default ItemsOrdered;
