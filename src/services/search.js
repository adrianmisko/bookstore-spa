export const fetchBooks = queryString => {
  const path = 'https://bookstore-flask.herokuapp.com/api/books' + queryString;
  return fetch(path,
    { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })
    .then(response => response)
    .catch(err => console.error(err));
};

export const fetchAutocompleteOptions = ({ optionName, searchBy }) => {
  const domain = 'https://bookstore-flask.herokuapp.com';
  const path = `${domain}/api/${optionName}${searchBy !== '' ? '?' + optionName.slice(0, -1) + '=' : ''}${searchBy}`;  //eg /api/tags?tag=New, hence slice
  return fetch(path, { mode: 'cors', method: 'GET', headers: { 'Accept': 'Application/json' } })                  // no query string -> api returns all tags/genres etc
    .then(response => response);
};
