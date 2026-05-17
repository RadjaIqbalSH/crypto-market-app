import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE, isJwtTokenUsable } from "@/lib/auth";
import { IMarketApiCoin } from "@/typings/market";

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
			"https://fe-technical-assignment.dxtr.asia/api/v1/list-crypto",
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

		return NextResponse.json(result.data);
	} catch {
		return NextResponse.json([], { status: 500 });
	}
}
