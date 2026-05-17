import { headers } from "next/headers";
import { fetchApi } from "@/helpers/fetch";

interface IServerRequestOptions extends Omit<RequestInit, "body" | "headers"> {
	path: string;
	body?: Record<string, unknown>;
	headers?: HeadersInit;
}

export async function fetchServerApi(
	options: IServerRequestOptions
): Promise<Response | null> {
	const headersList = await headers();
	const host = headersList.get("host");
	const protocol = headersList.get("x-forwarded-proto") ?? "http";
	const cookieHeader = headersList.get("cookie");

	if (!host) {
		return null;
	}

	const requestHeaders = new Headers(options.headers);

	if (cookieHeader) {
		requestHeaders.set("cookie", cookieHeader);
	}

	return fetchApi({
		...options,
		path: `${protocol}://${host}${options.path.startsWith("/") ? options.path : `/${options.path}`}`,
		headers: requestHeaders,
	});
}
