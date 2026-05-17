"use client";

import { FormEvent, useEffect, useReducer } from "react";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { OtpInput } from "@/components/molecules/OtpInput";
import { cn } from "@/lib/cn";

interface IOtpFormState {
	otp: string;
	errorMessage?: string;
}

type TOtpFormAction =
	| { type: "set-otp"; value: string }
	| { type: "set-error"; value?: string }
	| { type: "apply-submission-error"; value: string }
	| { type: "sync-default"; value: string };

interface IOtpFormProps {
	className?: string;
	description?: string;
	contactValue?: string;
	defaultOtp?: string;
	isSubmitting?: boolean;
	submissionError?: string;
	onSubmit?: (payload: { otp: string }) => Promise<void> | void;
}

const initialOtpFormState: IOtpFormState = {
	otp: "",
	errorMessage: undefined,
};

function otpFormReducer(
	state: IOtpFormState,
	action: TOtpFormAction
): IOtpFormState {
	switch (action.type) {
		case "set-otp":
			return {
				...state,
				otp: action.value,
				errorMessage: undefined,
			};
		case "set-error":
			return {
				...state,
				errorMessage: action.value,
			};
		case "apply-submission-error":
			return {
				...state,
				otp: "",
				errorMessage: action.value,
			};
		case "sync-default":
			return {
				...state,
				otp: action.value,
			};
		default:
			return state;
	}
}

export function OtpForm(props: IOtpFormProps) {
	const {
		className,
		contactValue,
		defaultOtp = "",
		isSubmitting = false,
		submissionError,
		onSubmit,
	} = props;
	const [state, dispatch] = useReducer(otpFormReducer, initialOtpFormState);
	const { otp, errorMessage } = state;

	useEffect(() => {
		dispatch({ type: "sync-default", value: defaultOtp });
	}, [defaultOtp]);

	useEffect(() => {
		if (!submissionError) {
			return;
		}

		dispatch({ type: "apply-submission-error", value: submissionError });
	}, [submissionError]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!otp.trim()) {
			dispatch({
				type: "set-error",
				value: "Please enter the verification code.",
			});
			return;
		}

		if (otp.trim().length < 6) {
			dispatch({
				type: "set-error",
				value: "Please enter the complete 6-digit code.",
			});
			return;
		}

		await onSubmit?.({ otp: otp.trim() });
	}

	return (
		<form
			className={cn("relative space-y-32 w-[360px]", className)}
			noValidate
			onSubmit={handleSubmit}
		>
			<div className="space-y-8">
				<Text
					className="text-center"
					as="h1"
					variant="headline-large"
					color="primary-body"
				>
					Confirm your phone
				</Text>
				<Text
					className="text-center"
					as="p"
					variant="body-medium"
					color="primary-body"
				>
					We send 6 digits code to +{contactValue}
				</Text>
			</div>
			<OtpInput
				label=""
				length={6}
				autoFocus
				disabled={isSubmitting}
				value={otp}
				errorMessage={errorMessage}
				onChange={(value) => dispatch({ type: "set-otp", value })}
			/>
			<Button type="submit" isLoading={isSubmitting} className="w-full">
				Confirm
			</Button>
		</form>
	);
}
