"use client";

import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";
import { Text } from "@/components/atoms/Text";
import { useDebounce } from "@/hooks/use-debounce";
import { type IMarketCoin } from "@/typings/market";
import Image from "next/image";

interface IMarketTemplateProps {
	coins: IMarketCoin[];
	sidebar: ReactNode;
	content: ReactNode;
}

interface IMarketContextValue {
	tabs: Array<{ id: string; label: string }>;
	activeTab: string;
	setActiveTab: Dispatch<SetStateAction<string>>;
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	filteredCoins: IMarketCoin[];
	selectedCoin: IMarketCoin | null;
	selectedCoinId: string | null;
	setSelectedCoinId: Dispatch<SetStateAction<string | null>>;
	emptyStateMessage: string;
}

const MarketContext = createContext<IMarketContextValue | null>(null);

export function useMarketContext() {
	const context = useContext(MarketContext);

	if (!context) {
		throw new Error("useMarketContext must be used within MarketTemplate.");
	}

	return context;
}

function buildMarketTabs(coins: IMarketCoin[]) {
	const reservedTabIds = new Set(["all", "favorites"]);
	const typeTabs = Array.from(new Set(coins.map((coin) => coin.type)))
		.filter((type) => type && !reservedTabIds.has(type))
		.map((type) => ({
			id: `${type}`,
			label: type || "",
		}));

	return [
		{ id: "all", label: "All" },
		...typeTabs,
		{ id: "favorites", label: "Favorites" },
	];
}

export default function MarketTemplate(props: IMarketTemplateProps) {
	const { coins, sidebar, content } = props;
	const [activeTab, setActiveTab] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCoinId, setSelectedCoinId] = useState<string | null>(
		coins[0]?.id ?? null
	);
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	const tabs = useMemo(() => buildMarketTabs(coins), [coins]);
	const normalizedQuery = debouncedSearchQuery.trim().toLowerCase();
	const filteredCoins = useMemo(() => {
		return coins.filter((coin) => {
			const coinType = coin.type ?? "";
			const coinName = coin.name ?? "";
			const coinSymbol = coin.symbol ?? "";
			const matchesTab =
				activeTab === "all"
					? true
					: activeTab === "favorites"
						? coin.isFavorite
						: coinType === activeTab.replace(/^type:/, "");
			const matchesSearch = normalizedQuery
				? coinName.toLowerCase().includes(normalizedQuery) ||
					coinSymbol.toLowerCase().includes(normalizedQuery)
				: true;

			return matchesTab && matchesSearch;
		});
	}, [activeTab, coins, normalizedQuery]);

	const selectedCoin =
		filteredCoins.find((coin) => coin.id === selectedCoinId) ??
		filteredCoins[0] ??
		null;
	const emptyStateMessage = normalizedQuery
		? `We couldn't find '${searchQuery}'. Try searching with a different keyword.`
		: "No cryptocurrencies match this category.";

	return (
		<MarketContext.Provider
			value={{
				tabs,
				activeTab,
				setActiveTab,
				searchQuery,
				setSearchQuery,
				filteredCoins,
				selectedCoin,
				selectedCoinId: selectedCoin?.id ?? null,
				setSelectedCoinId,
				emptyStateMessage,
			}}
		>
			<div className="flex h-dvh w-full flex-row">
				<aside className="h-full w-379 bg-surface px-16 pt-20">
					<Text
						className="mb-16 ml-16"
						as="h2"
						variant="title-large"
						color="primary-body"
					>
						Markets
					</Text>

					<div>{sidebar}</div>
				</aside>
				<main className="w-full px-16">
					<div className="mb-16 flex h-132 items-center gap-8 border-b border-border-and-divider px-16 pb-2 pt-64">
						<Image
							className="size-40 rounded-sm"
							src="/images/avatar.webp"
							width={40}
							height={40}
							alt="profile"
						/>
						<Text as="h3" variant="headline-large" color="primary-body">
							John Johnson
						</Text>
					</div>
					<div className="mb-16 px-16">
						<Text
							className="mb-7"
							as="h4"
							variant="headline-small"
							color="primary-body"
						>
							Welcome to Trading Dashboard
						</Text>
					</div>
					<div className="px-16">{content}</div>
				</main>
			</div>
		</MarketContext.Provider>
	);
}
