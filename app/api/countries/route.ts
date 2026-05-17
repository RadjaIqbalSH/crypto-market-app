import { NextResponse } from "next/server";
import { type ICountriesResponse } from "@/typings/country";

export async function GET() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/countries`,
			{
				cache: "no-store",
			}
		);

		if (!response.ok) {
			return NextResponse.json([], { status: response.status });
		}

		const result = (await response.json()) as ICountriesResponse;

		if (!result.success) {
			return NextResponse.json([], { status: 200 });
		}

		return NextResponse.json(result.data);
	} catch {
		return NextResponse.json([], { status: 500 });
	}
}
