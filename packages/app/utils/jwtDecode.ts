import { DecodedToken } from "@/types/decodedToken";
import { jwtDecode as originalJwtDecode } from "jwt-decode";

const jwtDecode = (token: string): DecodedToken => {
  return originalJwtDecode(token) as DecodedToken;
};

export default jwtDecode;
