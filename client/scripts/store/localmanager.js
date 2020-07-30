export const tokenLocalGetter = () => {
  return localStorage.getItem('token');
};

export const tokenLocalSetter = (token) => {
  return localStorage.setItem('token', token);
};

export const tokenLocalRemover = () => {
  return localStorage.removeItem('token');
};

export const mailMomentLocalGetter = () => {
  return localStorage.getItem('mailMoment');
};

export const mailMomentLocalSetter = (time) => {
  return localStorage.setItem('mailMoment', time);
};
