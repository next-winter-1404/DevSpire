import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode(token) as IDecodedToken;

    if (!decoded.exp) return true;

    return Date.now() / 1000 > decoded.exp - 10;
  } catch (error) {
    return true;
  }
}
