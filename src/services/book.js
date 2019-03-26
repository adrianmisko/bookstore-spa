
export const getBook = id => {
    const path = 'https://bookstore-flask.herokuapp.com/api/books/' + id.toString();
    return fetch(path, { method: 'GET', mode: 'cors' })
      .then(response => response);
  };

export const getReviews = (id, page) => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books/' + id.toString() + `/reviews?page=${page}`;
  return fetch(path, { method: 'GET', mode: 'cors' })
    .then(response => response);
};


export const postReview = (id, { author, body, mark }) => {
  const postRequestBody = JSON.stringify({
    author,
    body,
    mark: mark * 2,
  });

  return fetch('https://bookstore-flask.herokuapp.com/api/books/' + id.toString() + '/reviews', {
    mode: 'cors', method: 'POST', body: postRequestBody, headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response);
};

export const upvoteReview = id => {
  const path = `https://bookstore-flask.herokuapp.com/api/reviews/${id}/upvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const downvoteReview = id => {
  const path = `https://bookstore-flask.herokuapp.com/api/reviews/${id}/downvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const cancelUpvote = id => {
  const path = `https://bookstore-flask.herokuapp.com/api/reviews/${id}/cancel_upvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const cancelDownvote = id => {
  const path = `https://bookstore-flask.herokuapp.com/api/reviews/${id}/cancel_downvote`;
  return fetch(path, {
    mode: 'cors', method: 'POST', headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response);
};

export const fetchFeatured = () => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books?featured=true';
  return fetch(path, { mode: 'cors', method: 'get' })
    .then(response => response.json())
    .then(({ data, total }) => data)
    .catch(err => console.log(err));
};

export const fetchBooks = () => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books?page=2';
  return fetch(path, { mode: 'cors', method: 'get' })
    .then(response => response.json())
    .then(({ data, total }) => data)
    .catch(err => console.log(err));
};
