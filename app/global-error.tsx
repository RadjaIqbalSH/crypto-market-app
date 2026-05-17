"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import { Text } from "@/components/atoms/Text";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-roboto",
});

export default function GlobalError() {
	return (
		<html lang="en" className={roboto.variable}>
			<body className="bg-bg text-primary-body">
				<div className="flex min-h-dvh items-center justify-center px-24">
					<Text as="h1" variant="headline-large" color="primary-body">
						500 Server Error
					</Text>
				</div>
			</body>
		</html>
	);
}
