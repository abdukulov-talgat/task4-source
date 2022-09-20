const AUTH_TOKEN_KEY = 'task4-token';

const saveToken = (token: string) => {
  return localStorage.setItem(AUTH_TOKEN_KEY, token);
}

const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

const getToken = (): string => {
  return localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

export {saveToken, removeToken, getToken}
