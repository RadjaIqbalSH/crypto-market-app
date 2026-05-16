import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TVariant = "headline-large" | "title-medium";

type TColor = "primary" | "primary-body" | "secondary" | "success" | "white";

type TTransform = "uppercase" | "lowercase" | "capitalize" | "normal-case";

interface ITextOwnProps<T extends ElementType = "p"> {
	children: ReactNode;
	as?: T;
	variant?: TVariant;
	color?: TColor;
	transform?: TTransform;
	className?: string;
}

type TTextProps<T extends ElementType = "p"> = ITextOwnProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof ITextOwnProps<T> | "color">;

const variantClasses: Record<TVariant, string> = {
	"headline-large":
		"font-roboto font-semibold text-[32px]/[40px] tracking-[0.25%]",
	"title-medium":
		"font-roboto font-medium text-base/[20px] tracking-[0.15px]",
};

const colorClasses: Record<TColor, string> = {
	primary: "text-primary",
	"primary-body": "text-primary-body",
	secondary: "text-secondary",
	success: "text-success",
	white: "text-white",
};

export function Text<T extends ElementType = "p">(props: TTextProps<T>) {
	// props
	const {
		children,
		as,
		variant = "headline-large",
		color = "primary",
		transform = "normal-case",
		className,
		...restProps
	} = props;

	const Component = as ?? "p";

	return (
		<Component
			className={cn(
				variantClasses[variant],
				colorClasses[color],
				transform,
				className
			)}
			{...restProps}
		>
			{children}
		</Component>
	);
}
