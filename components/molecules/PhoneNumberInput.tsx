"use client";

import {
	ComponentPropsWithoutRef,
	forwardRef,
	ChangeEvent,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { FieldShell } from "@/components/atoms/FieldShell";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/helpers/cn";
import { type IPhoneCountryOption } from "@/typings/country";

interface IPhoneNumberInputProps
	extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
	label?: string;
	options: IPhoneCountryOption[];
	defaultSelectedCode?: string;
	onSelectedCodeChange?: (option: IPhoneCountryOption) => void;
	containerClassName?: string;
	helperText?: string;
	errorMessage?: string;
}

export const PhoneNumberInput = forwardRef<
	HTMLInputElement,
	IPhoneNumberInputProps
>(function PhoneNumberInput(props, ref) {
	const {
		label = "Mobile Number",
		options,
		defaultSelectedCode,
		onSelectedCodeChange,
		containerClassName,
		helperText,
		errorMessage,
		className,
		disabled,
		required,
		placeholder = "Enter your number",
		id,
		onChange,
		...restProps
	} = props;
	const rootRef = useRef<HTMLDivElement>(null);
	const autoId = useId();
	const inputId = id ?? autoId;
	const fallbackOption = options[0] ?? null;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCode, setSelectedCode] = useState(
		defaultSelectedCode ?? fallbackOption?.code ?? ""
	);

	const activeOption =
		options.find((option) => option.code === selectedCode) ??
		fallbackOption;

	useEffect(() => {
		if (!activeOption) {
			return;
		}

		onSelectedCodeChange?.(activeOption);
	}, [activeOption, onSelectedCodeChange]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		function handlePointerDown(event: MouseEvent) {
			if (!rootRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		window.addEventListener("mousedown", handlePointerDown);

		return () => {
			window.removeEventListener("mousedown", handlePointerDown);
		};
	}, [isOpen]);

	function handleSelect(option: IPhoneCountryOption) {
		setSelectedCode(option.code);
		onSelectedCodeChange?.(option);
		setIsOpen(false);
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		event.currentTarget.value = event.currentTarget.value.replace(
			/\D+/g,
			""
		);
		onChange?.(event);
	}

	return (
		<FormField
			label={label}
			inputId={inputId}
			required={required}
			helperText={helperText}
			errorMessage={errorMessage}
		>
			<div ref={rootRef} className="relative">
				<FieldShell
					disabled={disabled}
					invalid={Boolean(errorMessage)}
					className={containerClassName}
				>
					<Button
						type="button"
						variant="ghost"
						disabled={disabled || !activeOption}
						className="h-full shrink-0 rounded-md px-0 pr-8"
						onClick={() => setIsOpen((prev) => !prev)}
					>
						<span className="text-sm leading-none">
							{activeOption?.flag}
						</span>
						<Text
							variant="body-large"
							color="primary-body"
							className="ml-8"
						>
							{activeOption?.dialCode ?? "--"}
						</Text>
					</Button>
					<Input
						ref={ref}
						id={inputId}
						type="tel"
						inputMode="numeric"
						pattern="[0-9]*"
						disabled={disabled}
						required={required}
						placeholder={placeholder}
						className={cn("flex-1 bg-transparent", className)}
						onChange={handleChange}
						{...restProps}
					/>
				</FieldShell>
				{isOpen && activeOption ? (
					<div className="absolute left-0 top-[calc(100%+8px)] z-20 max-h-256 w-full overflow-auto rounded-xl border border-border-subtle bg-white p-4 shadow-[0_16px_40px_rgba(16,24,40,0.12)]">
						{options.map((option) => {
							const isSelected =
								option.code === activeOption?.code;

							return (
								<Button
									key={option.code}
									type="button"
									variant="ghost"
									className={cn(
										"flex h-auto w-full items-center gap-12 rounded-lg px-12 py-8 text-left transition-colors duration-150",
										"hover:bg-surface-hover",
										isSelected && "bg-surface-muted"
									)}
									onClick={() => handleSelect(option)}
								>
									<span className="text-base leading-none">
										{option.flag}
									</span>
									<div className="min-w-0 flex-1">
										<Text
											as="p"
											variant="body-medium"
											color="primary-body"
											className="truncate font-medium"
										>
											{option.label}
										</Text>
										<Text
											as="p"
											variant="body-small"
											color="muted"
										>
											{option.dialCode}
										</Text>
									</div>
									{isSelected ? (
										<Check className="size-16 shrink-0 text-primary" />
									) : null}
								</Button>
							);
						})}
					</div>
				) : null}
			</div>
		</FormField>
	);
});
