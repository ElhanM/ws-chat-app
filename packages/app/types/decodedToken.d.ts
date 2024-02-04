import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  username: string;
}
