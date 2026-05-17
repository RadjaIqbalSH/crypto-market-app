"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OtpForm } from "@/components/organisms/OtpForm";
import { type IPendingAuthCookie } from "@/lib/auth";

interface IOtpFormContainerProps {
	pendingAuth: IPendingAuthCookie;
}

interface IVerifyOtpErrorResponse {
	success: false;
	message: string;
	status_code: number;
	data?: Record<string, never> | null;
}

export function OtpFormContainer(props: IOtpFormContainerProps) {
	const { pendingAuth } = props;
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionError, setSubmissionError] = useState<string>();

	async function handleSubmit(payload: { otp: string }) {
		setIsSubmitting(true);
		setSubmissionError(undefined);

		try {
			const response = await fetch("/api/auth/verify-otp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					otp: payload.otp,
				}),
			});

			if (!response.ok) {
				const result = (await response.json()) as IVerifyOtpErrorResponse;
				setSubmissionError(
					result.message || "The verification code is invalid."
				);
				return;
			}

			router.push("/market");
		} catch {
			setSubmissionError("Unable to verify the code right now. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<OtpForm
			defaultOtp={pendingAuth.otp}
			contactValue={pendingAuth.phone ?? pendingAuth.email}
			isSubmitting={isSubmitting}
			submissionError={submissionError}
			onSubmit={handleSubmit}
		/>
	);
}
