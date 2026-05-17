"use client";

import {
	ChangeEvent,
	ClipboardEvent,
	ComponentPropsWithoutRef,
	forwardRef,
	KeyboardEvent,
	useId,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/helpers/cn";

interface IOtpInputProps
	extends Omit<
		ComponentPropsWithoutRef<"input">,
		"type" | "value" | "defaultValue" | "onChange"
	> {
	label?: string;
	helperText?: string;
	errorMessage?: string;
	length?: number;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	onComplete?: (value: string) => void;
	containerClassName?: string;
	slotClassName?: string;
}

function normalizeOtpValue(value: string, length: number) {
	return value.replace(/\D+/g, "").slice(0, length);
}

function toOtpArray(value: string, length: number) {
	return Array.from({ length }, (_, index) => value[index] ?? "");
}

export const OtpInput = forwardRef<HTMLInputElement[], IOtpInputProps>(
	function OtpInput(props, ref) {
		const {
			label = "OTP",
			helperText,
			errorMessage,
			length = 6,
			value,
			defaultValue = "",
			onChange,
			onComplete,
			required,
			disabled,
			id,
			name,
			autoFocus,
			containerClassName,
			slotClassName,
			...restProps
		} = props;
		const normalizedLength = Math.max(1, length);
		const autoId = useId();
		const inputId = id ?? autoId;
		const isControlled = value !== undefined;
		const [internalValue, setInternalValue] = useState(() =>
			normalizeOtpValue(defaultValue, normalizedLength)
		);
		const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

		useImperativeHandle(
			ref,
			() => inputRefs.current.filter(Boolean) as HTMLInputElement[]
		);

		const otpValue = isControlled
			? normalizeOtpValue(value, normalizedLength)
			: internalValue;
		const otpSlots = useMemo(
			() => toOtpArray(otpValue, normalizedLength),
			[otpValue, normalizedLength]
		);

		function focusSlot(index: number) {
			inputRefs.current[index]?.focus();
			inputRefs.current[index]?.select();
		}

		function commitValue(nextValue: string) {
			const sanitizedValue = normalizeOtpValue(
				nextValue,
				normalizedLength
			);

			if (!isControlled) {
				setInternalValue(sanitizedValue);
			}

			onChange?.(sanitizedValue);

			if (sanitizedValue.length === normalizedLength) {
				onComplete?.(sanitizedValue);
			}
		}

		function updateSlot(index: number, nextChar: string) {
			const nextSlots = [...otpSlots];
			nextSlots[index] = nextChar;
			commitValue(nextSlots.join(""));
		}

		function handleSlotChange(
			index: number,
			event: ChangeEvent<HTMLInputElement>
		) {
			const sanitizedValue = normalizeOtpValue(
				event.currentTarget.value,
				normalizedLength
			);

			if (!sanitizedValue) {
				updateSlot(index, "");
				return;
			}

			if (sanitizedValue.length > 1) {
				const nextSlots = [...otpSlots];

				for (
					let offset = 0;
					offset < sanitizedValue.length;
					offset += 1
				) {
					const targetIndex = index + offset;

					if (targetIndex >= normalizedLength) {
						break;
					}

					nextSlots[targetIndex] = sanitizedValue[offset] ?? "";
				}

				commitValue(nextSlots.join(""));
				focusSlot(
					Math.min(
						index + sanitizedValue.length,
						normalizedLength - 1
					)
				);
				return;
			}

			updateSlot(index, sanitizedValue);

			if (index < normalizedLength - 1) {
				focusSlot(index + 1);
			}
		}

		function handleKeyDown(
			index: number,
			event: KeyboardEvent<HTMLInputElement>
		) {
			if (event.key === "Backspace") {
				event.preventDefault();

				if (otpSlots[index]) {
					updateSlot(index, "");
					return;
				}

				if (index > 0) {
					updateSlot(index - 1, "");
					focusSlot(index - 1);
				}
			}

			if (event.key === "ArrowLeft" && index > 0) {
				event.preventDefault();
				focusSlot(index - 1);
			}

			if (event.key === "ArrowRight" && index < normalizedLength - 1) {
				event.preventDefault();
				focusSlot(index + 1);
			}
		}

		function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
			event.preventDefault();

			const pastedValue = normalizeOtpValue(
				event.clipboardData.getData("text"),
				normalizedLength
			);

			if (!pastedValue) {
				return;
			}

			commitValue(pastedValue);
			focusSlot(Math.min(pastedValue.length, normalizedLength) - 1);
		}

		return (
			<FormField
				label={label}
				inputId={inputId}
				required={required}
				helperText={helperText}
				errorMessage={errorMessage}
			>
				<div
					className={cn(
						"flex items-center gap-12",
						containerClassName
					)}
					onPaste={handlePaste}
				>
					{otpSlots.map((slotValue, index) => (
						<div key={`${inputId}-${index}`} className="relative">
							<Input
								variant="otp"
								ref={(node) => {
									inputRefs.current[index] = node;
								}}
								id={index === 0 ? inputId : undefined}
								name={name}
								type="text"
								inputMode="numeric"
								autoComplete={
									index === 0 ? "one-time-code" : "off"
								}
								pattern="[0-9]*"
								maxLength={1}
								required={required}
								disabled={disabled}
								autoFocus={autoFocus && index === 0}
								value={slotValue}
								className={cn(
									"w-50 h-72 pb-8",
									errorMessage && "border-primary",
									slotClassName
								)}
								onChange={(event) =>
									handleSlotChange(index, event)
								}
								onKeyDown={(event) =>
									handleKeyDown(index, event)
								}
								{...restProps}
							/>
							<div
								className={cn(
									"pointer-events-none absolute bottom-8 left-1/2 h-2 w-32 -translate-x-1/2 rounded-full transition-colors duration-200",
									slotValue
										? "bg-primary"
										: "bg-border-and-divider"
								)}
							/>
						</div>
					))}
				</div>
			</FormField>
		);
	}
);
