import { type NextRequest, NextResponse } from "next/server";
import {
	AUTH_TOKEN_COOKIE,
	isJwtTokenUsable,
	parsePendingAuthCookie,
	PENDING_AUTH_COOKIE,
} from "@/auth";

export type TAuthStatus = "authenticated" | "pending-otp" | "guest";
export type TGuardedPath = "/login" | "/otp" | "/market";

const redirectRules: Record<TGuardedPath, Record<TAuthStatus, string | null>> = {
	"/login": {
		authenticated: "/market",
		"pending-otp": "/otp",
		guest: null,
	},
	"/otp": {
		authenticated: "/market",
		"pending-otp": null,
		guest: "/login",
	},
	"/market": {
		authenticated: null,
		"pending-otp": "/otp",
		guest: "/login",
	},
};

export interface IProxyAuthState {
	authStatus: TAuthStatus;
	shouldClearAuthToken: boolean;
	shouldClearPendingAuth: boolean;
}

export function isGuardedPath(pathname: string): pathname is TGuardedPath {
	return pathname in redirectRules;
}

export function getProxyAuthState(request: NextRequest): IProxyAuthState {
	const authToken = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
	const pendingAuth = parsePendingAuthCookie(
		request.cookies.get(PENDING_AUTH_COOKIE)?.value
	);

	const hasUsableAuthToken = isJwtTokenUsable(authToken);
	const hasUsablePendingAuth = isJwtTokenUsable(pendingAuth?.token);

	return {
		authStatus: hasUsableAuthToken
			? "authenticated"
			: hasUsablePendingAuth
				? "pending-otp"
				: "guest",
		shouldClearAuthToken: Boolean(authToken) && !hasUsableAuthToken,
		shouldClearPendingAuth:
			Boolean(pendingAuth?.token) && !hasUsablePendingAuth,
	};
}

export function getProxyRedirectPath(
	pathname: TGuardedPath,
	authStatus: TAuthStatus
) {
	return redirectRules[pathname][authStatus];
}

export function withAuthCookieCleanup(
	response: NextResponse,
	authState: IProxyAuthState
) {
	if (authState.shouldClearAuthToken) {
		response.cookies.delete(AUTH_TOKEN_COOKIE);
	}

	if (authState.shouldClearPendingAuth) {
		response.cookies.delete(PENDING_AUTH_COOKIE);
	}

	return response;
}
