import { NextResponse, type NextRequest } from "next/server";
import {
	getProxyAuthState,
	getProxyRedirectPath,
	isGuardedPath,
	withAuthCookieCleanup,
} from "@/lib/proxy-auth";

export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (!isGuardedPath(pathname)) {
		return NextResponse.next();
	}

	const authState = getProxyAuthState(request);
	const redirectPath = getProxyRedirectPath(pathname, authState.authStatus);

	if (redirectPath) {
		return withAuthCookieCleanup(
			NextResponse.redirect(new URL(redirectPath, request.url)),
			authState
		);
	}

	return withAuthCookieCleanup(NextResponse.next(), authState);
}

export const config = {
	matcher: ["/login", "/otp", "/market"],
};
