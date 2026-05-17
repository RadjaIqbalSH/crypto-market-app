import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/helpers/cn";

export type TButtonVariant = "primary" | "ghost";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	isLoading?: boolean;
	variant?: TButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
	function Button(props, ref) {
		const {
			children,
			type = "button",
			disabled,
			isLoading = false,
			variant = "primary",
			className,
			...restProps
		} = props;

		const variantClasses: Record<TButtonVariant, string> = {
			primary: "bg-primary text-white",
			ghost: "bg-transparent text-primary-body",
		};

		const loaderClasses: Record<TButtonVariant, string> = {
			primary: "text-white",
			ghost: "text-primary-body",
		};

		return (
			<button
				ref={ref}
				type={type}
				disabled={disabled || isLoading}
				className={cn(
					"inline-flex items-center justify-center rounded-sm cursor-pointer select-none",
					"transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
					"active:scale-[0.99]",
					"disabled:cursor-not-allowed disabled:opacity-50",
					"h-40 px-16",
					variantClasses[variant],
					className
				)}
				{...restProps}
			>
				{isLoading ? (
					<LoaderCircle
						className={cn("animate-spin", loaderClasses[variant])}
					/>
				) : (
					children
				)}
			</button>
		);
	}
);
