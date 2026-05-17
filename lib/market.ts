import { IMarketApiCoin, IMarketCoin } from "@/typings/market";

export function mapMarketCoins(coins: IMarketApiCoin[]): IMarketCoin[] {
	return coins.map((coin) => ({
		...coin,
		priceIdr: coin.price_idr,
		changePercent: coin.change_percent,
	}));
}

export async function getMarketCoins(
	cookieHeader?: string
): Promise<IMarketCoin[]> {
	try {
		const response = await fetch(
			`http://localhost:3000/api/market/list-crypto`,
			{
				cache: "no-store",
				headers: cookieHeader
					? {
							cookie: cookieHeader,
					  }
					: undefined,
			}
		);

		if (!response.ok) {
			return [];
		}

		const result: IMarketApiCoin[] = await response.json();

		return mapMarketCoins(result) as IMarketCoin[];
	} catch {
		return [];
	}
}
