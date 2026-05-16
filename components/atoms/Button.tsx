// components/atoms/Button.tsx

"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/cn";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	isLoading?: boolean;
}

export function Button(props: IButtonProps) {
	const {
		children,
		type = "button",
		disabled,
		isLoading = false,
		className,
		...restProps
	} = props;

	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			className={cn(
				"inline-flex items-center justify-center gap-2 rounded-sm cursor-pointer",
				"bg-primary",
				"transition-colors duration-200",
				"hover:bg-primary/90",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...restProps}
		>
			{isLoading ? (
				<LoaderCircle
					aria-hidden="true"
					className="animate-spin text-white"
				/>
			) : (
				<Text as="span" variant="title-medium" color="white">
					{isLoading ? "Loading..." : children}
				</Text>
			)}
		</button>
	);
}
