"use client";

import { Button } from "@/components/atoms/Button";
import { Search } from "lucide-react";

import { IconButton } from "@/components/atoms/IconButton";
import { Text } from "@/components/atoms/Text";

export default function page() {
	return (
		<div>
			<Text as="button" transform="uppercase">
				page
			</Text>
			<Button className="w-full h-[40px]">Login</Button>
			<IconButton
				label="search"
				icon={<Search />}
				className="size-10"
				onClick={() => console.log("search")}
			/>
		</div>
	);
}
