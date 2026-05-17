import { headers } from "next/headers";
import { type ReactNode } from "react";
import MarketTemplate from "@/components/templates/MarketTemplate";
import { getMarketCoins } from "@/lib/market";

interface IMarketLayoutProps {
	sidebar: ReactNode;
	content: ReactNode;
}

export default async function MarketLayout(props: IMarketLayoutProps) {
	const { sidebar, content } = props;
	const headersList = await headers();
	const cookieHeader = headersList.get("cookie") ?? undefined;

	const coins = await getMarketCoins(cookieHeader);

	return <MarketTemplate coins={coins} sidebar={sidebar} content={content} />;
}
