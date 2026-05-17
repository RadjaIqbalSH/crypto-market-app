import { Text } from "@/components/atoms/Text";

export default function NotFound() {
	return (
		<div className="flex min-h-dvh items-center justify-center px-24">
			<Text as="h1" variant="headline-large" color="primary-body">
				404 Not Found
			</Text>
		</div>
	);
}
