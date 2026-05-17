import { type ReactNode } from "react";
import MarketTemplate from "@/components/templates/MarketTemplate";
import { getMarketCoins } from "@/services/market.service";

interface IMarketLayoutProps {
	sidebar: ReactNode;
	content: ReactNode;
}

export default async function MarketLayout(props: IMarketLayoutProps) {
	const { sidebar, content } = props;
	const coins = await getMarketCoins();

	return <MarketTemplate coins={coins} sidebar={sidebar} content={content} />;
}
