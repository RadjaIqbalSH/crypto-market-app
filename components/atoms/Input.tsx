import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/helpers/cn";

type TInputVariant = "default" | "otp";

interface IInputProps extends ComponentPropsWithoutRef<"input"> {
	variant?: TInputVariant;
}

const variantClasses: Record<TInputVariant, string> = {
	default:
		"min-w-0 h-full w-full border-0 bg-transparent text-[16px]/[20px] tracking-[0.2px] text-primary-body outline-none placeholder:text-secondary-body cursor-text",
	otp: "rounded-sm border border-border-and-divider bg-secondary text-center font-roboto text-[28px]/[1] font-medium text-primary outline-none cursor-text placeholder:text-secondary-body",
};

export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(
	props,
	ref
) {
	const { className, disabled, variant = "default", ...restProps } = props;

	return (
		<input
			ref={ref}
			disabled={disabled}
			className={cn(
				variantClasses[variant],
				disabled && variant === "default" && "cursor-not-allowed",
				disabled &&
					variant === "otp" &&
					"cursor-not-allowed opacity-60",
				className
			)}
			{...restProps}
		/>
	);
});
