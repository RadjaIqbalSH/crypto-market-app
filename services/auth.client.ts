import { fetchLocalApi } from "@/helpers/fetch";
import {
	type ILoginApiErrorResponse,
	type ILoginFormErrors,
	type ILoginSubmitPayload,
	type IVerifyOtpErrorResponse,
} from "@/typings/auth";

export async function submitLogin(payload: ILoginSubmitPayload) {
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
		const response = await fetchLocalApi({
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

export async function submitOtpVerification(payload: { otp: string, phoneNumber: string }) {
	try {
		const response = await fetchLocalApi({
			path: "/api/auth/verify-otp",
			method: "POST",
			body: {
				otp: payload.otp,
				phone: payload.phoneNumber,
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
