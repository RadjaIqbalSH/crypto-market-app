"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	LoginForm,
	type ILoginFormErrors,
} from "@/components/organisms/LoginForm";
import { type IPhoneCountryOption } from "@/components/molecules/PhoneNumberInput";
import { login } from "@/services/auth.client";

interface ILoginFormContainerProps {
	phoneOptions: IPhoneCountryOption[];
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
			const result = await login(payload);

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
