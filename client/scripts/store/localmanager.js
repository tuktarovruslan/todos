export const todosLocalGetter = () => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const stashLocalGetter = () => {
  return JSON.parse(localStorage.getItem('stash') || '[]');
};

export const todosLocalSetter = (todos) => {
  return localStorage.setItem('todos', JSON.stringify(todos));
};

export const stashLocalSetter = (stash) => {
  return localStorage.setItem('stash', JSON.stringify(stash));
};
