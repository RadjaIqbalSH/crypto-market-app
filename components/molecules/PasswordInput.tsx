"use client";

import { forwardRef, InputHTMLAttributes, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { FieldShell } from "@/components/atoms/FieldShell";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/lib/cn";

interface IPasswordInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: string;
	containerClassName?: string;
	helperText?: string;
	errorMessage?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
	function PasswordInput(props, ref) {
		const {
			label,
			className,
			containerClassName,
			disabled,
			required,
			helperText,
			errorMessage,
			placeholder = "Enter your password",
			id,
			...restProps
		} = props;
		const [isVisible, setIsVisible] = useState(false);
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
						type={isVisible ? "text" : "password"}
						disabled={disabled}
						required={required}
						placeholder={placeholder}
						className={cn("flex-1", className)}
						{...restProps}
					/>
					<Button
						type="button"
						title={isVisible ? "Hide password" : "Show password"}
						variant="ghost"
						disabled={disabled}
						className="size-20 rounded-full p-0 hover:bg-transparent focus-visible:ring-0"
						onClick={() => setIsVisible((prev) => !prev)}
					>
						{isVisible ? (
							<EyeOff className="ml-4 size-24 text-primary-body" />
						) : (
							<Eye className="ml-4 size-24 text-primary-body" />
						)}
					</Button>
				</FieldShell>
			</FormField>
		);
	}
);
