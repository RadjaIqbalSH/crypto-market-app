export interface IMarketCoin {
	id?: string;
	name?: string;
	symbol?: string;
	image?: string;
	priceIdr?: string;
	changePercent?: string;
	isPositive?: boolean;
	hot?: boolean;
	isFavorite?: boolean;
	type?: string;
}

export interface IMarketApiCoin {
	id?: string;
	name?: string;
	symbol?: string;
	image?: string;
	price_idr?: string;
	change_percent?: string;
	isPositive?: boolean;
	hot?: boolean;
	isFavorite?: boolean;
	type?: string;
}
