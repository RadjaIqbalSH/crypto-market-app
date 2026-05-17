"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Search } from "lucide-react";
import { FieldShell } from "@/components/atoms/FieldShell";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/helpers/cn";

interface ISearchInputProps
	extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
	containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(
	function SearchInput(props, ref) {
		const {
			className,
			containerClassName,
			disabled,
			placeholder = "Search",
			...restProps
		} = props;

		return (
			<FieldShell disabled={disabled} className={containerClassName}>
				<Input
					ref={ref}
					type="text"
					inputMode="search"
					autoComplete="off"
					disabled={disabled}
					placeholder={placeholder}
					className={cn("flex-1", className)}
					{...restProps}
				/>
				<Search className="ml-4 size-16 shrink-0 text-muted" />
			</FieldShell>
		);
	}
);
