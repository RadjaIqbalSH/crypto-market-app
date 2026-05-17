import { NextResponse } from "next/server";
import {
	getAuthCookieOptions,
	PENDING_AUTH_COOKIE,
	type IPendingAuthCookie,
} from "@/lib/auth";

interface ILoginRequestBody {
	email?: string;
	phone?: string;
	password?: string;
}

interface ILoginSuccessResponse {
	success: true;
	status_code: number;
	message: string;
	data: {
		otp: string;
		phone: string;
		email?: string;
		token: string;
	};
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ILoginRequestBody;

		const response = await fetch(
			"https://fe-technical-assignment.dxtr.asia/api/v1/auth/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
				cache: "no-store",
			}
		);

		const result = (await response.json()) as ILoginSuccessResponse;
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
