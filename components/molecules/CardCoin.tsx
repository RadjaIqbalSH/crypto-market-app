import Image from "next/image";
import { MouseEventHandler } from "react";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/helpers/cn";

interface ICardCoinProps {
	image: string;
	symbol: string;
	name: string;
	price: string;
	changePercent: string;
	isPositive: boolean;
	hot: boolean;
	selected?: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function CardCoin(props: ICardCoinProps) {
	const {
		image,
		symbol,
		name,
		price,
		changePercent,
		isPositive,
		hot,
		selected = false,
		onClick,
	} = props;
	const symbolLabel = `${symbol}${hot ? " 🔥" : ""}`;

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex items-center justify-between rounded-sm px-16 py-14 cursor-pointer transition-colors duration-200",
				selected
					? "bg-primary hover:bg-primary/60"
					: "bg-secondary-body hover:bg-secondary-body/60"
			)}
		>
			<div className="flex gap-8">
				{image ? (
					<Image
						src={image}
						width={40}
						height={40}
						alt={`${name} logo`}
						className="object-contain rounded-sm"
					/>
				) : null}
				<div className="flex flex-col gap-4 items-start">
					<Text
						as="span"
						variant="title-medium"
						color={selected ? "white" : "primary-body"}
						transform="uppercase"
						className="block truncate"
					>
						{symbolLabel}
					</Text>
					<Text
						as="span"
						variant="body-medium"
						color={selected ? "white" : "primary-body"}
						className="block truncate opacity-90"
					>
						{name}
					</Text>
				</div>
			</div>
			<div className="ml-12 flex shrink-0 flex-col items-end gap-2">
				<Text
					as="span"
					variant="label-large"
					color={
						selected ? "white" : isPositive ? "success" : "error"
					}
					className={cn(
						"w-fit rounded-sm p-2",
						selected ? "bg-white/16" : "bg-white"
					)}
				>
					{changePercent}
				</Text>
				<Text
					as="span"
					variant="title-small"
					color={selected ? "white" : "primary-body"}
				>
					{price}
				</Text>
			</div>
		</button>
	);
}
