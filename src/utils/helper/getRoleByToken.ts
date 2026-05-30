import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { jwtDecode } from "jwt-decode";

export const getRoleByToken = (token: string) => {
  if (token) {
    const decoded = jwtDecode(token) as IDecodedToken;
    return decoded.role as string;
  } else {
    return null;
  }
};
