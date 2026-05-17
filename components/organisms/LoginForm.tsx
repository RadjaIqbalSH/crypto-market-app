"use client";

import { FormEvent, useCallback, useEffect, useReducer } from "react";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { EmailInput } from "@/components/molecules/EmailInput";
import {
	PhoneNumberInput,
	type IPhoneCountryOption,
} from "@/components/molecules/PhoneNumberInput";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { cn } from "@/helpers/cn";

type TLoginMethod = "email" | "phone";

interface ILoginFormState {
	method: TLoginMethod;
	email: string;
	phoneDialCode: string;
	phoneNumber: string;
	password: string;
	errors: {
		email?: string;
		phoneNumber?: string;
		password?: string;
	};
}

type TLoginFormAction =
	| { type: "toggle-method" }
	| { type: "set-email"; value: string }
	| { type: "set-phone-dial-code"; value: string }
	| { type: "set-phone-number"; value: string }
	| { type: "set-password"; value: string }
	| { type: "set-errors"; value: ILoginFormState["errors"] };

const initialLoginFormState: ILoginFormState = {
	method: "email",
	email: "",
	phoneDialCode: "",
	phoneNumber: "",
	password: "",
	errors: {},
};

function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function loginFormReducer(
	state: ILoginFormState,
	action: TLoginFormAction
): ILoginFormState {
	switch (action.type) {
		case "toggle-method":
			return {
				method: state.method === "email" ? "phone" : "email",
				email: "",
				phoneDialCode: "",
				phoneNumber: "",
				password: "",
				errors: {},
			};
		case "set-email":
			return {
				...state,
				email: action.value,
				errors: {
					...state.errors,
					email: undefined,
				},
			};
		case "set-phone-dial-code":
			return {
				...state,
				phoneDialCode: action.value,
				errors: {
					...state.errors,
					phoneNumber: undefined,
				},
			};
		case "set-phone-number":
			return {
				...state,
				phoneNumber: action.value,
				errors: {
					...state.errors,
					phoneNumber: undefined,
				},
			};
		case "set-password":
			return {
				...state,
				password: action.value,
				errors: {
					...state.errors,
					password: undefined,
				},
			};
		case "set-errors":
			return {
				...state,
				errors: action.value,
			};
		default:
			return state;
	}
}

interface ILoginFormSubmitPayload {
	method: TLoginMethod;
	email: string;
	phoneDialCode: string;
	phoneNumber: string;
	password: string;
}

export interface ILoginFormErrors {
	email?: string;
	phoneNumber?: string;
	password?: string;
}

interface ILoginFormProps {
	phoneOptions: IPhoneCountryOption[];
	className?: string;
	isSubmitting?: boolean;
	submissionErrors?: ILoginFormErrors;
	onSubmit?: (payload: ILoginFormSubmitPayload) => Promise<void> | void;
}

export function LoginForm(props: ILoginFormProps) {
	const {
		phoneOptions,
		className,
		isSubmitting = false,
		submissionErrors,
		onSubmit,
	} = props;
	const [state, dispatch] = useReducer(loginFormReducer, initialLoginFormState);
	const { method, email, phoneDialCode, phoneNumber, password, errors } = state;

	const handlePhoneSelectedCodeChange = useCallback(
		(option: IPhoneCountryOption) => {
			dispatch({
				type: "set-phone-dial-code",
				value: option.dialCode,
			});
		},
		[]
	);

	useEffect(() => {
		dispatch({ type: "set-errors", value: submissionErrors ?? {} });
	}, [submissionErrors]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const nextErrors: ILoginFormState["errors"] = {};

		if (method === "email" && !email.trim()) {
			nextErrors.email = "Please enter your email address.";
		} else if (method === "email" && !isValidEmail(email.trim())) {
			nextErrors.email = "Please enter a valid email address.";
		}

		if (method === "phone" && !phoneNumber.trim()) {
			nextErrors.phoneNumber = "Please enter your phone number.";
		}

		if (!password.trim()) {
			nextErrors.password = "Please enter your password.";
		}

		if (Object.keys(nextErrors).length > 0) {
			dispatch({ type: "set-errors", value: nextErrors });
			return;
		}

		await onSubmit?.({
			method,
			email,
			phoneDialCode,
			phoneNumber,
			password,
		});
	}

	return (
		<form className={cn("relative w-full", className)} noValidate onSubmit={handleSubmit}>
			<Button
				type="button"
				variant="ghost"
				className="absolute top-84 right-0 h-auto justify-start px-0 mb-16"
				disabled={isSubmitting}
				onClick={() => dispatch({ type: "toggle-method" })}
			>
				<Text variant="body-small" color="primary">{method === "email"
					? "Sign in with phone number"
					: "Sign in with email"}</Text>
			</Button>
			<div className="space-y-8 mb-16">
				<Text
					as="h1"
					variant="headline-large"
					color="primary-body"
				>
					Welcome Back
				</Text>
				<Text as="p" variant="body-medium" color="primary-body">
					Enter your Credentials to access your account
				</Text>
			</div>
			{method === "email" ? (
				<EmailInput
					label="Email"
					placeholder="Enter your email"
					disabled={isSubmitting}
					errorMessage={errors.email}
					value={email}
					onChange={(event) =>
						dispatch({ type: "set-email", value: event.currentTarget.value })
					}
				/>
			) : (
				<PhoneNumberInput
					label="Phone Number"
					options={phoneOptions}
					placeholder="Enter your phone number"
					disabled={isSubmitting}
					errorMessage={errors.phoneNumber}
					value={phoneNumber}
					onSelectedCodeChange={handlePhoneSelectedCodeChange}
					onChange={(event) =>
						dispatch({
							type: "set-phone-number",
							value: event.currentTarget.value,
						})
					}
				/>
			)}
			<div className="h-16"/>
			<PasswordInput
				label="Password"
				placeholder="Enter your password"
				disabled={isSubmitting}
				value={password}
				errorMessage={errors.password}
				onChange={(event) =>
					dispatch({ type: "set-password", value: event.currentTarget.value })
				}
			/>
			<Button
				type="button"
				variant="ghost"
				disabled={isSubmitting}
				className="h-auto justify-start px-0 mb-16"
			>
				<Text variant="body-small" color="primary">Forgot Password?</Text>
			</Button>
			<Button type="submit" isLoading={isSubmitting} className="w-full">
				Sign In
			</Button>
		</form>
	);
}
