"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	LoginForm,
	type ILoginFormErrors,
} from "@/components/organisms/LoginForm";
import { type IPhoneCountryOption } from "@/components/molecules/PhoneNumberInput";

interface ILoginFormContainerProps {
	phoneOptions: IPhoneCountryOption[];
}

interface ILoginApiErrorResponse {
	success: false;
	message: string;
	status_code: number;
	data?: {
		field?: "password" | "email" | "phone";
	} | null;
}

export function LoginFormContainer(props: ILoginFormContainerProps) {
	const { phoneOptions } = props;
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionErrors, setSubmissionErrors] = useState<ILoginFormErrors>({});

	async function handleSubmit(payload: {
		method: "email" | "phone";
		email: string;
		phoneDialCode: string;
		phoneNumber: string;
		password: string;
	}) {
		setIsSubmitting(true);
		setSubmissionErrors({});

		try {
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

			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (response.ok) {
				await response.json();
				router.push("/otp");
				return;
			}

			const result = (await response.json()) as ILoginApiErrorResponse;
			const nextErrors: ILoginFormErrors = {};

			if (result.data?.field === "email") {
				nextErrors.email = result.message;
			}

			if (result.data?.field === "phone") {
				nextErrors.phoneNumber = result.message;
			}

			if (result.data?.field === "password") {
				nextErrors.password = result.message;
			}

			setSubmissionErrors(nextErrors);
		} catch {
			setSubmissionErrors({
				password: "Unable to sign in right now. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<LoginForm
			phoneOptions={phoneOptions}
			isSubmitting={isSubmitting}
			submissionErrors={submissionErrors}
			onSubmit={handleSubmit}
		/>
	);
}
