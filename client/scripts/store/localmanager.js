export const todosLocalGetter = () => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const stashesLocalGetter = () => {
  return JSON.parse(localStorage.getItem('stashes') || '[]');
};

export const todosLocalSetter = (todos) => {
  return localStorage.setItem('todos', JSON.stringify(todos));
};

export const stashesLocalSetter = (stashes) => {
  return localStorage.setItem('stashes', JSON.stringify(stashes));
};

// export const todosLocalRemover = (id) => {
//   return localStorage.removeItem('todos.id');
// };
