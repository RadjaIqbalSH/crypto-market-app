"use client";

import CardCoin from "@/components/molecules/CardCoin";
import { SearchInput } from "@/components/molecules/SearchInput";
import { Tabs } from "@/components/molecules/Tabs";
import { Text } from "@/components/atoms/Text";
import { useMarketContext } from "@/components/templates/MarketTemplate";

export default function MarketSidebar() {
	const {
		tabs,
		activeTab,
		setActiveTab,
		searchQuery,
		setSearchQuery,
		filteredCoins,
		selectedCoinId,
		setSelectedCoinId,
		emptyStateMessage,
	} = useMarketContext();

	return (
		<div className="w-full">
			<div className="mx-16 mb-24">
				<SearchInput
					placeholder="Search coin or symbol"
					value={searchQuery}
					onChange={(event) =>
						setSearchQuery(event.currentTarget.value)
					}
				/>
			</div>
			<Tabs items={tabs} value={activeTab} onValueChange={setActiveTab} />
			<div className="mt-24 flex h-full max-h-[calc(100dvh-194px)] flex-col gap-16 overflow-y-auto pr-4">
				{filteredCoins.length ? (
					filteredCoins.map((coin, index) => (
						<CardCoin
							key={`${coin.id}-${coin.symbol}-${coin.type}-${index}`}
							image={
								coin.image || "/images/placeholder-coin.webp"
							}
							symbol={coin?.symbol || "-"}
							name={coin?.name || "-"}
							price={coin?.priceIdr || "-"}
							changePercent={coin?.changePercent || "-"}
							isPositive={coin?.isPositive || true}
							hot={coin?.hot || false}
							selected={coin.id === selectedCoinId}
							onClick={() => setSelectedCoinId(coin?.id || "")}
						/>
					))
				) : (
					<div className="rounded-sm bg-secondary px-16 py-20">
						<Text as="p" variant="body-medium" color="primary-body">
							{emptyStateMessage}
						</Text>
					</div>
				)}
			</div>
		</div>
	);
}
