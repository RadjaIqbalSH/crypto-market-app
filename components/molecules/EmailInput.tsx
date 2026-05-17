"use client";

import { forwardRef, InputHTMLAttributes, useId } from "react";
import { FieldShell } from "@/components/atoms/FieldShell";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/lib/cn";

interface IEmailInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: string;
	containerClassName?: string;
	helperText?: string;
	errorMessage?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, IEmailInputProps>(
	function EmailInput(props, ref) {
		const {
			label = "Email",
			className,
			containerClassName,
			disabled,
			required,
			helperText,
			errorMessage,
			placeholder = "Enter your email",
			id,
			...restProps
		} = props;
		const autoId = useId();
		const inputId = id ?? autoId;

		return (
			<FormField
				label={label}
				inputId={inputId}
				required={required}
				helperText={helperText}
				errorMessage={errorMessage}
			>
				<FieldShell
					disabled={disabled}
					invalid={Boolean(errorMessage)}
					className={containerClassName}
				>
					<Input
						ref={ref}
						id={inputId}
						type="email"
						inputMode="email"
						autoCapitalize="none"
						autoCorrect="off"
						autoComplete="email"
						spellCheck={false}
						disabled={disabled}
						required={required}
						placeholder={placeholder}
						className={cn("flex-1", className)}
						{...restProps}
					/>
				</FieldShell>
			</FormField>
		);
	}
);
