import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TVariant =
	| "headline-large"
	| "headline-medium"
	| "headline-small"
	| "title-large"
	| "title-medium"
	| "title-small"
	| "body-large"
	| "body-medium"
	| "body-small"
	| "label-large"
	| "label-medium"
	| "label-small";

type TColor =
	| "primary"
	| "primary-body"
	| "secondary"
	| "success"
	| "white"
	| "error"
	| "muted";

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
	// headline
	"headline-large":
		"font-roboto font-semibold text-[32px]/[40px] tracking-[0.25px]",
	"headline-medium":
		"font-roboto font-medium text-[28px]/[40px] tracking-[0%]",
	"headline-small":
		"font-roboto font-medium text-[24px]/[32px] tracking-[0%]",
	// title
	"title-large":
		"font-roboto font-medium text-[20px]/[24px] tracking-[0.1px]",
	"title-medium":
		"font-roboto font-medium text-[16px]/[20px] tracking-[0.15px]",
	"title-small":
		"font-roboto font-medium text-[14px]/[20px] tracking-[0.1px]",
	// body
	"body-large": "font-roboto text-[16px]/[20px] font-normal tracking-[0.2px]",
	"body-medium":
		"font-roboto text-[14px]/[20px] font-normal tracking-[0.25px]",
	"body-small": "font-roboto text-[12px]/[16px] font-normal tracking-[0.4px]",
	// label
	"label-large":
		"font-roboto text-[14px]/[20px] font-medium tracking-[0.1px]",
	"label-medium":
		"font-roboto text-[12px]/[18px] font-medium tracking-normal",
	"label-small": "font-roboto text-[10px]/[18px] font-medium tracking-normal",
};

const colorClasses: Record<TColor, string> = {
	primary: "text-primary",
	"primary-body": "text-primary-body",
	secondary: "text-secondary",
	success: "text-success",
	muted: "text-muted",
	error: "text-error",
	white: "text-white",
};

export function Text<T extends ElementType = "p">(props: TTextProps<T>) {
	// props
	const {
		children,
		as,
		variant = "body-medium",
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
