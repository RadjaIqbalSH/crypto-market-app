import { NextResponse } from "next/server";
import {
	getAuthCookieOptions,
	PENDING_AUTH_COOKIE,
} from "@/auth-session";
import { readJsonOrFallback } from "@/helpers/api-response";
import {
	type ILoginApiErrorResponse,
	type ILoginRequestBody,
	type ILoginSuccessResponse,
	type IPendingAuthCookie,
} from "@/typings/auth";

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ILoginRequestBody;
		const response = await fetch(
			`${process.env.API_BASE_URL}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
				cache: "no-store",
			}
		);

		const result = await readJsonOrFallback<
			ILoginSuccessResponse | ILoginApiErrorResponse
		>(response, {
			success: false,
			message: "Unable to process your login request right now.",
			status_code: response.status,
			data: null,
		});
		const nextResponse = NextResponse.json(result, {
			status: response.status,
		});

		if (response.ok && result.success) {
			const pendingAuth: IPendingAuthCookie = {
				method: body.email ? "email" : "phone",
				otp: result.data.otp,
				phone: result.data.phone,
				email: result.data.email,
				token: result.data.token,
			};

			nextResponse.cookies.set(
				PENDING_AUTH_COOKIE,
				JSON.stringify(pendingAuth),
				getAuthCookieOptions()
			);
		}

		return nextResponse;
	} catch {
		return Response.json(
			{
				success: false,
				message: "Unable to process your login request right now.",
				status_code: 500,
				data: null,
			},
			{ status: 500 }
		);
	}
}
