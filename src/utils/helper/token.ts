import { jwtDecode } from "jwt-decode";
export function getUserIdFromToken(token: string) {
    if (!token) return null;

    try {
        const decoded = jwtDecode<{ id?: string; sub?: string }>(token);
        return decoded.id || decoded.sub || null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}
