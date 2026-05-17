import { type Metadata } from "next";
import { Roboto } from "next/font/google";
import { type ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "Crypto Market App",
	description: "Crypto market dashboard",
};

interface IRootLayoutProps {
	children: ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
	const { children } = props;

	return (
		<html lang="en" className={roboto.variable}>
			<body className="bg-bg text-primary-body">
				<NextTopLoader
					color="#613de4"
					height={4}
					showSpinner={false}
					crawlSpeed={150}
					speed={300}
				/>
				{children}
			</body>
		</html>
	);
}
