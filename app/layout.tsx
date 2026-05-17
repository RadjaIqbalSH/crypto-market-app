import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const robot = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Crypto Market",
	description: "Crypto Market App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={` ${robot.variable} h-full antialiased`}>
			<body className="min-h-full">{children}</body>
		</html>
	);
}
