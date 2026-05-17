import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/helpers/cn";

interface IFieldShellProps extends ComponentPropsWithoutRef<"div"> {
	disabled?: boolean;
	invalid?: boolean;
}

export function FieldShell(props: IFieldShellProps) {
	const {
		children,
		className,
		disabled = false,
		invalid = false,
		...restProps
	} = props;

	return (
		<div
			className={cn(
				"bg-white flex h-40 w-full items-center rounded-sm border border-border-and-divider px-16 cursor-text",
				"transition-all duration-200 ease-out",
				"hover:border-primary/50",
				invalid
					? "border-error focus-within:border-error"
					: "focus-within:border-primary/50 ",
				disabled && "cursor-not-allowed opacity-60",
				className
			)}
			{...restProps}
		>
			{children}
		</div>
	);
}
