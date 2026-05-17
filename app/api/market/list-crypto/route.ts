import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, isJwtTokenUsable } from "@/lib/auth-session";
import { readJsonOrFallback } from "@/helpers/api-response";
import { mapMarketCoins } from "@/services/market.service";
import {
	type IMarketApiCoin,
	type IMarketListApiResponse,
} from "@/typings/market";

export async function GET() {
	try {
		const cookieStore = await cookies();
		const authToken = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

		if (!isJwtTokenUsable(authToken)) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					data: [],
				},
				{ status: 401 }
			);
		}

		const authorizationToken = authToken as string;
		const response = await fetch(
			`${process.env.API_BASE_URL}/list-crypto`,
			{
				cache: "no-store",
				headers: {
					Authorization: authorizationToken,
				},
			}
		);

		if (!response.ok) {
				const result = await readJsonOrFallback(response, {
					success: false,
					message: "Unable to fetch market data right now.",
					status_code: response.status,
					data: [],
				});

			return NextResponse.json(result, { status: response.status });
		}

		const result = (await response.json()) as IMarketListApiResponse;

		if (!result.success) {
			return NextResponse.json(result, { status: 200 });
		}

		return NextResponse.json(mapMarketCoins(result.data));
	} catch {
		return NextResponse.json(
				{
					success: false,
					message: "Unable to fetch market data right now.",
					status_code: 500,
					data: [] as IMarketApiCoin[],
				},
			{ status: 500 }
		);
	}
}
