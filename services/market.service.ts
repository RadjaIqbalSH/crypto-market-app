import { fetchServerLocalApi } from "@/helpers/server-fetch";
import { type IMarketApiCoin, type IMarketCoin } from "@/typings/market";

export function mapMarketCoins(coins: IMarketApiCoin[]): IMarketCoin[] {
	return coins.map((coin) => ({
		...coin,
		priceIdr: coin.price_idr,
		changePercent: coin.change_percent,
	}));
}

export async function getMarketCoinList(): Promise<IMarketCoin[]> {
	try {
		const response = await fetchServerLocalApi({
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
