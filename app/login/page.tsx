import { LoginFormContainer } from "@/app/login/LoginFormContainer";
import { getPhoneCountryOptions } from "@/services/country.service";

export default async function LoginPage() {
	const phoneOptions = await getPhoneCountryOptions();

	return <LoginFormContainer phoneOptions={phoneOptions} />;
}
