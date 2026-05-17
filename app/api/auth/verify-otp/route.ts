import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	AUTH_TOKEN_COOKIE,
	getAuthCookieOptions,
	parsePendingAuthCookie,
	PENDING_AUTH_COOKIE,
} from "@/auth";
import { type IVerifyOtpRequestBody } from "@/typings/auth";

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as IVerifyOtpRequestBody;
		const cookieStore = await cookies();
		const pendingAuth = parsePendingAuthCookie(
			cookieStore.get(PENDING_AUTH_COOKIE)?.value
		);

		if (!pendingAuth?.token || !pendingAuth?.phone) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Your login session has expired. Please sign in again.",
					status_code: 401,
					data: null,
				},
				{ status: 401 }
			);
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: pendingAuth.token,
				},
				body: JSON.stringify({
					otp: body.otp,
					phone: pendingAuth.phone,
				}),
				cache: "no-store",
			}
		);

		const result = await response.json();
		const nextResponse = NextResponse.json(result, {
			status: response.status,
		});

		if (response.ok) {
			nextResponse.cookies.set(
				AUTH_TOKEN_COOKIE,
				pendingAuth.token,
				getAuthCookieOptions()
			);
			nextResponse.cookies.delete(PENDING_AUTH_COOKIE);
		}

		return nextResponse;
	} catch {
		return Response.json(
			{
				success: false,
				message: "Unable to verify the OTP right now.",
				status_code: 500,
				data: null,
			},
			{ status: 500 }
		);
	}
}
