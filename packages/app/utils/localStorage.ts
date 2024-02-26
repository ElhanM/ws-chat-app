export const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "token";
    return localStorage.getItem(tokenKey) === ""
      ? null
      : localStorage.getItem(tokenKey);
  } else {
    throw new Error("Window is undefined");
  }
};

export const removeTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "token";
    localStorage.removeItem(tokenKey);
  } else {
    throw new Error("Window is undefined");
  }
};
