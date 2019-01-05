import { Skeleton } from 'antd';
import React from 'react';
import BookDetailsLayout from '../BookDetailsLayout/BookDetailsLayout';

const BookDetailsSkeleton = () => {

  const imageSkeleton = <div
    style={{
      width: '100%',
      height: '50vw',
      maxHeight: 520,
      backgroundColor: 'rgba(0, 0, 0, 0.01)',
      border: '1px solid rgba(0, 0, 0, 0.3)'
    }}
  > </div>;

  const bookInfoSkeleton = <Skeleton paragraph={{ rows: 11 }} active title={null}/>;

  const descriptionSkeleton = <Skeleton paragraph={{ rows: 4 }} active title={null}/>;

    return (
      <BookDetailsLayout
        images={imageSkeleton}
        bookInfo={bookInfoSkeleton}
        description={descriptionSkeleton}
      />
  );
};

export default BookDetailsSkeleton;
