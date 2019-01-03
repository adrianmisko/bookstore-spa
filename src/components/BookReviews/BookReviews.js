import { Comment, List, Tooltip } from 'antd';
import { connect } from 'dva';

const BookReviews = ({reviews, loadingReviews}) => {

  return (
    <h1>here be comments</h1>
  );

};

export default connect(({ book }) => book)(BookReviews);
