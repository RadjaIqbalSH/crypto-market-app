import { NextResponse } from "next/server";
import { readJsonOrFallback } from "@/helpers/api-response";
import { type ICountry, type ICountriesResponse } from "@/typings/country";

export async function GET() {
	try {
		const response = await fetch(
			`${process.env.API_BASE_URL}/countries`,
			{
				cache: "no-store",
			}
		);

		if (!response.ok) {
				const result = await readJsonOrFallback(response, {
					success: false,
					message: "Unable to fetch countries right now.",
					status_code: response.status,
					data: [],
				});

			return NextResponse.json(result, { status: response.status });
		}

		const result = (await response.json()) as ICountriesResponse;

		if (!result.success) {
			return NextResponse.json(result, { status: 200 });
		}

		return NextResponse.json(result.data);
	} catch {
		return NextResponse.json(
				{
					success: false,
					message: "Unable to fetch countries right now.",
					status_code: 500,
					data: [] as ICountry[],
				},
			{ status: 500 }
		);
	}
}
