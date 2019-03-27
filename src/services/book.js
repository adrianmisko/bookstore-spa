import config from '../config';

export const getBook = id => {
    const path = `${config.DOMAIN}/api/books/${id.toString()}`;
    return fetch(path, { method: 'GET', mode: 'cors' })
      .then(response => response);
  };

export const getReviews = (id, page) => {
  const path = `${config.DOMAIN}/api/books/${id.toString()}/reviews?page=${page}`;
  return fetch(path, { method: 'GET', mode: 'cors' })
    .then(response => response);
};


export const postReview = (id, { author, body, mark }) => {
  const postRequestBody = JSON.stringify({
    author,
    body,
    mark: mark * 2,
  });

  return fetch(`${config.DOMAIN}/api/books/${id.toString()}/reviews`, {
    mode: 'cors', method: 'POST', body: postRequestBody, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response);
};

export const upvoteReview = id => {
  const path = `${config.DOMAIN}/reviews/${id}/upvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const downvoteReview = id => {
  const path = `${config.DOMAIN}/api/reviews/${id}/downvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const cancelUpvote = id => {
  const path = `${config.DOMAIN}/api/reviews/${id}/cancel_upvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const cancelDownvote = id => {
  const path = `${config.DOMAIN}/api/reviews/${id}/cancel_downvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const fetchFeatured = () => {
  const path = `${config.DOMAIN}/api/books?featured=true`;
  return fetch(path, { mode: 'cors', method: 'get' })
    .then(response => response.json())
    .then(({ data, total }) => data)
    .catch(err => console.log(err));
};

export const fetchBooks = () => {
  const path = `${config.DOMAIN}/api/books?page=2`;
  return fetch(path, { mode: 'cors', method: 'get' })
    .then(response => response.json())
    .then(({ data, total }) => data)
    .catch(err => console.log(err));
};
