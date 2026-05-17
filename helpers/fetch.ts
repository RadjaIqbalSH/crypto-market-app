interface ILocalApiRequestOptions
	extends Omit<RequestInit, "body" | "headers"> {
	path: string;
	body?: Record<string, unknown>;
	headers?: HeadersInit;
}

export async function fetchLocalApi(
	options: ILocalApiRequestOptions
): Promise<Response | null> {
	const {
		path,
		body,
		headers,
		cache = "no-store",
		...rest
	} = options;
	const requestHeaders = new Headers(headers);

	if (body) {
		requestHeaders.set("Content-Type", "application/json");
	}

	try {
		return await fetch(
			path,
			{
				...rest,
				cache,
				headers: requestHeaders,
				body: body ? JSON.stringify(body) : undefined,
			}
		);
	} catch {
		return null;
	}
}
