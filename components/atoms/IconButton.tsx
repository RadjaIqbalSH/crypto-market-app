"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	label: string;
	isLoading?: boolean;
}

export function IconButton(props: IIconButtonProps) {
	const {
		icon,
		label,
		type = "button",
		disabled,
		isLoading = false,
		className,
		...restProps
	} = props;

	return (
		<button
			type={type}
			aria-label={label}
			title={label}
			disabled={disabled || isLoading}
			className={cn(
				"inline-flex items-center justify-center rounded-sm cursor-pointer",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...restProps}
		>
			{isLoading ? (
				<LoaderCircle className="animate-spin" />
			) : (
				<span
					aria-hidden="true"
					className="inline-flex items-center justify-center"
				>
					{icon}
				</span>
			)}
		</button>
	);
}
