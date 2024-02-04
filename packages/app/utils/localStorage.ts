export const getTokenFromLocalStorage = () => {
  const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "token";
  return localStorage.getItem(tokenKey);
};

export const removeTokenFromLocalStorage = () => {
  const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "token";
  localStorage.removeItem(tokenKey);
};
