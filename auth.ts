import { decodeJwt } from "jose";
import { type IPendingAuthCookie } from "@/typings/auth";

export const PENDING_AUTH_COOKIE = "pending_auth";
export const AUTH_TOKEN_COOKIE = "auth_token";

export function getAuthCookieOptions() {
	return {
		httpOnly: true,
		sameSite: "lax" as const,
		secure: process.env.NODE_ENV === "production",
		path: "/",
	};
}

export function parsePendingAuthCookie(
	value?: string
): IPendingAuthCookie | null {
	try {
		return value ? (JSON.parse(value) as IPendingAuthCookie) : null;
	} catch {
		return null;
	}
}

export function isJwtTokenUsable(token?: string) {
	try {
		if (!token) {
			return false;
		}

		const payload = decodeJwt(token.replace(/^Bearer\s+/i, "").trim());

		return (
			typeof payload.exp === "number" &&
			payload.exp > Math.floor(Date.now() / 1000)
		);
	} catch {
		return false;
	}
}
