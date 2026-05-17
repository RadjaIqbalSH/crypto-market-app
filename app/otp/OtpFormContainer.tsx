"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OtpForm } from "@/components/organisms/OtpForm";
import { verifyOtp } from "@/services/auth.client";
import { type IPendingAuthCookie } from "@/typings/auth";

interface IOtpFormContainerProps {
	pendingAuth: IPendingAuthCookie;
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
			const result = await verifyOtp(payload);

			if (!result.ok) {
				setSubmissionError(result.errorMessage);
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
