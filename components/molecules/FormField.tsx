import { ReactNode } from "react";
import { Text } from "@/components/atoms/Text";

interface IFormFieldProps {
	label?: string;
	inputId: string;
	required?: boolean;
	helperText?: string;
	errorMessage?: string;
	children: ReactNode;
}

export function FormField(props: IFormFieldProps) {
	const {
		label,
		inputId,
		helperText,
		errorMessage,
		children,
	} = props;

	const message = errorMessage ?? helperText;
	const messageId = message ? `${inputId}-message` : undefined;
	const messageColor = errorMessage ? "error" : "primary-body";

	return (
		<div className="w-full">
			{label ? (
				<Text
					as="label"
					htmlFor={inputId}
					variant="body-small"
					color="primary-body"
					className="block mb-4"
				>
					{label}
				</Text>
			) : null}
			<div>{children}</div>
			{message ? (
				<Text
					as="span"
					id={messageId}
					variant="body-small"
					color={messageColor}
				>
					{message}
				</Text>
			) : null}
		</div>
	);
}
