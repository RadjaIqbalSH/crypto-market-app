"use client";

import Image from "next/image";
import { Text } from "@/components/atoms/Text";
import { useMarketContext } from "@/components/templates/MarketTemplate";

export default function MarketContent() {
	const { selectedCoin } = useMarketContext();

	if (!selectedCoin) {
		return (
			<Text as="p" variant="body-medium" color="primary-body">
				Select a cryptocurrency from the list to see the details.
			</Text>
		);
	}

	return (
		<div className="flex w-fit items-center gap-16 rounded-2xl ">
			<Image
				src={selectedCoin.image || "/images/placeholder-coin.webp"}
				width={40}
				height={40}
				alt={`${selectedCoin.name} logo`}
				className="object-contain rounded-sm"
			/>
			<div className="min-w-0">
				<Text as="p" variant="headline-small" color="primary-body">
					{selectedCoin.symbol}/{selectedCoin.symbol}
				</Text>
			</div>
			<div className="flex w-fit flex-col">
				<Text
					as="p"
					variant="title-medium"
					color={selectedCoin.isPositive ? "success" : "error"}
				>
					{selectedCoin.priceIdr}
				</Text>
				<Text
					as="p"
					variant="body-large"
					color={selectedCoin.isPositive ? "success" : "error"}
				>
					{selectedCoin.changePercent}
				</Text>
			</div>
		</div>
	);
}
