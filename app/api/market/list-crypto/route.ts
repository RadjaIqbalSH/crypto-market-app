import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, isJwtTokenUsable } from "@/auth";
import { mapMarketCoins } from "@/services/market.service";
import { type IMarketApiCoin } from "@/typings/market";

interface IMarketListApiResponse {
	success: boolean;
	message: string;
	data: IMarketApiCoin[];
}

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
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/list-crypto`,
			{
				cache: "no-store",
				headers: {
					Authorization: authorizationToken,
				},
			}
		);

		if (!response.ok) {
			return NextResponse.json([], { status: response.status });
		}

		const result = (await response.json()) as IMarketListApiResponse;

		if (!result.success) {
			return NextResponse.json([], { status: 200 });
		}

		return NextResponse.json(mapMarketCoins(result.data));
	} catch {
		return NextResponse.json([], { status: 500 });
	}
}
