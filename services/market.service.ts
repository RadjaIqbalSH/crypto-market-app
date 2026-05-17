import { fetchServerApi } from "@/helpers/server-fetch";
import { type IMarketApiCoin, type IMarketCoin } from "@/typings/market";

export function mapMarketCoins(coins: IMarketApiCoin[]): IMarketCoin[] {
	return coins.map((coin) => ({
		...coin,
		priceIdr: coin.price_idr,
		changePercent: coin.change_percent,
	}));
}

export async function getMarketCoins(): Promise<IMarketCoin[]> {
	try {
		const response = await fetchServerApi({
			path: "/api/market/list-crypto",
		});

		if (!response?.ok) {
			return [];
		}

		return (await response.json()) as IMarketCoin[];
	} catch {
		return [];
	}
}
