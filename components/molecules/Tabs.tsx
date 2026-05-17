"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Text } from "../atoms/Text";
import { cn } from "@/lib/cn";

export interface ITabItem {
	id: string;
	label: ReactNode;
}

interface ITabsProps {
	items: ITabItem[];
	value: string;
	onValueChange: (value: string) => void;
	className?: string;
	listClassName?: string;
	tabClassName?: string;
}

export function Tabs(props: ITabsProps) {
	const {
		items,
		value,
		onValueChange,
		className,
		listClassName,
		tabClassName,
	} = props;
	const listRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const activeTabId = value;

	useEffect(() => {
		const listElement = listRef.current;

		if (!listElement) {
			return;
		}

		function updateScrollState() {
			if (!listElement) {
				return;
			}

			const { scrollLeft, scrollWidth, clientWidth } = listElement;
			const maxScrollLeft = scrollWidth - clientWidth;

			setCanScrollLeft(scrollLeft > 3);
			setCanScrollRight(maxScrollLeft - scrollLeft > 3);
		}

		updateScrollState();

		const resizeObserver = new ResizeObserver(updateScrollState);
		resizeObserver.observe(listElement);
		listElement.addEventListener("scroll", updateScrollState, { passive: true });

		return () => {
			resizeObserver.disconnect();
			listElement.removeEventListener("scroll", updateScrollState);
		};
	}, [items]);

	function handleTabChange(nextValue: string) {
		onValueChange(nextValue);
	}

	function handleScroll(direction: "left" | "right") {
		const listElement = listRef.current;

		if (!listElement) {
			return;
		}

		const tabElements = Array.from(listElement.children) as HTMLElement[];

		if (!tabElements.length) {
			return;
		}

		const listRect = listElement.getBoundingClientRect();
		const targetTab =
			direction === "right"
				? tabElements.find((tabElement) => {
						const tabRect = tabElement.getBoundingClientRect();

						return tabRect.right > listRect.right + 1;
					})
				: [...tabElements]
						.reverse()
						.find((tabElement) => {
							const tabRect = tabElement.getBoundingClientRect();

							return tabRect.left < listRect.left - 1;
						});

		if (!targetTab) {
			return;
		}

		const targetRect = targetTab.getBoundingClientRect();
		const nextScrollLeft =
			direction === "right"
				? listElement.scrollLeft + (targetRect.right - listRect.right)
				: listElement.scrollLeft - (listRect.left - targetRect.left);

		listElement.scrollBy({
			left: nextScrollLeft - listElement.scrollLeft,
			behavior: "smooth",
		});
	}

	return (
		<div className={cn("flex items-end gap-8", className)}>
			{canScrollLeft ? (
				<Button
					type="button"
					variant="ghost"
					className="mb-4 size-24 shrink-0 rounded-full p-0 text-primary-body"
					onClick={() => handleScroll("left")}
				>
					<ChevronLeft className="size-24" />
				</Button>
			) : null}
			<div className="min-w-0 flex-1 border-b-2 border-border-and-divider">
				<div
					ref={listRef}
					className={cn(
						"-mb-2 flex items-end gap-4 overflow-x-auto pb-2 scroll-smooth whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
						listClassName
					)}
				>
					{items.map((item) => {
						const isActive = item.id === activeTabId;

						return (
							<Button
								key={item.id + "-tab"}
								type="button"
								variant="ghost"
								className={cn(
									"relative h-auto rounded-none px-24 py-12 text-sm/[20px] font-medium",
									"after:absolute after:bottom-[-2px] after:left-0 after:h-2 after:w-full after:rounded-full after:transition-colors",
									isActive ? "after:bg-primary" : "after:bg-transparent",
									tabClassName
								)}
								onClick={() => handleTabChange(item.id)}
							>
								<Text className="capitalize" variant="label-large" color={isActive ? "primary" : "primary-body"}>
									{item.label}
								</Text>
							</Button>
						);
					})}
				</div>
			</div>
			{canScrollRight ? (
				<Button
					type="button"
					variant="ghost"
					className="mb-4 size-24 shrink-0 rounded-full p-0 text-primary-body"
					onClick={() => handleScroll("right")}
				>
					<ChevronRight className="size-24" />
				</Button>
			) : null}
		</div>
	);
}
