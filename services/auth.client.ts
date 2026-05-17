import { type ILoginFormErrors } from "@/components/organisms/LoginForm";
import { fetchApi } from "@/helpers/fetch";
import {
	type ILoginApiErrorResponse,
	type IVerifyOtpErrorResponse,
} from "@/typings/auth";

export async function login(payload: {
	method: "email" | "phone";
	email: string;
	phoneDialCode: string;
	phoneNumber: string;
	password: string;
}) {
	const requestBody =
		payload.method === "email"
			? {
					email: payload.email,
					password: payload.password,
				}
			: {
					phone: `${payload.phoneDialCode.replace(/\+/g, "")}${payload.phoneNumber}`,
					password: payload.password,
	};

	try {
		const response = await fetchApi({
			path: "/api/auth/login",
			method: "POST",
			body: requestBody,
		});

		if (!response) {
			return {
				ok: false as const,
				errors: {
					password: "Unable to sign in right now. Please try again.",
				},
			};
		}

		if (response.ok) {
			return { ok: true as const, errors: {} };
		}

		const errors: ILoginFormErrors = {};
		const result =
			(await response.json().catch(() => null)) as
				| ILoginApiErrorResponse
				| null;

		if (result?.data?.field === "email") {
			errors.email = result.message;
		}

		if (result?.data?.field === "phone") {
			errors.phoneNumber = result.message;
		}

		if (result?.data?.field === "password") {
			errors.password = result.message;
		}

		return { ok: false as const, errors };
	} catch {
		return {
			ok: false as const,
			errors: {
				password: "Unable to sign in right now. Please try again.",
			},
		};
	}
}

export async function verifyOtp(payload: { otp: string }) {
	try {
		const response = await fetchApi({
			path: "/api/auth/verify-otp",
			method: "POST",
			body: {
				otp: payload.otp,
			},
		});

		if (!response) {
			return {
				ok: false as const,
				errorMessage: "Unable to verify the code right now. Please try again.",
			};
		}

		if (response.ok) {
			return { ok: true as const, errorMessage: undefined };
		}

		const result =
			(await response.json().catch(() => null)) as
				| IVerifyOtpErrorResponse
				| null;

		return {
			ok: false as const,
			errorMessage: result?.message || "The verification code is invalid.",
		};
	} catch {
		return {
			ok: false as const,
			errorMessage: "Unable to verify the code right now. Please try again.",
		};
	}
}
