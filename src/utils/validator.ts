export const validateUsername = (username: string) => {
  const regex = /^[a-z0-9]+$/;
  return regex.test(username);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};
