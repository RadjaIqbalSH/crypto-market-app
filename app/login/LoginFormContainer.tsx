"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/organisms/LoginForm";
import { submitLogin } from "@/services/auth.client";
import {
	type ILoginFormErrors,
	type ILoginSubmitPayload,
} from "@/typings/auth";
import { type IPhoneCountryOption } from "@/typings/country";

interface ILoginFormContainerProps {
	phoneOptions: IPhoneCountryOption[];
}

export function LoginFormContainer(props: ILoginFormContainerProps) {
	const { phoneOptions } = props;
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionErrors, setSubmissionErrors] = useState<ILoginFormErrors>({});

	async function handleSubmit(payload: ILoginSubmitPayload) {
		setIsSubmitting(true);
		setSubmissionErrors({});

		try {
			const result = await submitLogin(payload);

			if (result.ok) {
				router.push("/otp");
				return;
			}

			setSubmissionErrors(result.errors);
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
