const baseUrl = 'https://us-central1-cloudfunctions-6bfbc.cloudfunctions.net/date';

export const loadTodos = () => {
  return fetch(baseUrl)
    .then(res => res.json())
    .then((data) => {
      const result = data.map(resp => {
        const item = {
          id: resp.id,
          title: resp.data.text,
        };
        return item;
      })
      return result;
    });
};

export const createTodo = (todo) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
};

export const saveTodo = (todo) => {
  return fetch(baseUrl, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
};

export const deleteTodo = (id) => {
  return fetch(baseUrl, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  });
};
