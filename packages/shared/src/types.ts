export type User = {
  id: string;
  username: string;
};

export type AuthUser = User & {
  accessToken: string;
};
