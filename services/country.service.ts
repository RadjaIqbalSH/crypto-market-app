import { fetchServerLocalApi } from "@/helpers/server-fetch";
import {
	type ICountry,
	type IPhoneCountryOption,
} from "@/typings/country";

function countryCodeToFlag(code: string) {
	return code
		.toUpperCase()
		.replace(/./g, (char) =>
			String.fromCodePoint(127397 + char.charCodeAt(0))
		);
}

export async function getPhoneCountryOptions(): Promise<IPhoneCountryOption[]> {
	try {
		const response = await fetchServerLocalApi({
			path: "/api/countries",
		});

		if (!response?.ok) {
			return [];
		}

		const countries = (await response.json()) as ICountry[];

		return countries.map((country) => ({
			code: country.code,
			dialCode: country.dial_code,
			label: country.name,
			flag: countryCodeToFlag(country.code),
		}));
	} catch {
		return [];
	}
}
