import { connect } from 'dva';
import React from 'react';
import CardCenteredLayout from '../../components/CardCenteredLayout/CardCenteredLayout';
import BookDetails from '../../components/BookDetails/BookDetails';
import BookSkeleton from '../../components/BookSkeleton/BookSkeleton';
import { Skeleton } from 'antd';


const Book = ({ dispatch, book, loading }) => {


  const title = loading ?
    <Skeleton active paragraph={null} title={{ width: 120 }}/>
    :
    <span style={{ fontSize: '1.6em', marginLeft: 20 }}>{book.title}</span>;

  return (
    <CardCenteredLayout
      title={title}
    >
      {
        loading ?
          <BookSkeleton/>
        :
          <BookDetails book={book} dispatch={dispatch}/>
      }
    </CardCenteredLayout>
  );
};

export default connect(({ book }) => book)(Book);
