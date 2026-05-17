import { LoginFormContainer } from "@/app/login/LoginFormContainer";
import { type IPhoneCountryOption } from "@/components/molecules/PhoneNumberInput";

interface ICountriesResponse {
	success: boolean;
	message: string;
	data: Array<{
		name: string;
		code: string;
		dial_code: string;
	}>;
}

function countryCodeToFlag(code: string) {
	return code
		.toUpperCase()
		.replace(/./g, (char) =>
			String.fromCodePoint(127397 + char.charCodeAt(0))
		);
}

async function getPhoneOptions(): Promise<IPhoneCountryOption[]> {
	try {
		const response = await fetch(
			"https://fe-technical-assignment.dxtr.asia/api/v1/countries",
			{
				cache: "no-store",
			}
		);

		if (!response.ok) {
			return [];
		}

		const result = (await response.json()) as ICountriesResponse;

		if (!result.success) {
			return [];
		}

		return result.data.map((country) => ({
			code: country.code,
			dialCode: country.dial_code,
			label: country.name,
			flag: countryCodeToFlag(country.code),
		}));
	} catch {
		return [];
	}
}

export default async function LoginPage() {
	const phoneOptions = await getPhoneOptions();

	return <LoginFormContainer phoneOptions={phoneOptions} />;
}
