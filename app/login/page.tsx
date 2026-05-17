import { LoginFormContainer } from "@/app/login/LoginFormContainer";
import { getPhoneOptions } from "@/services/country.service";

export default async function LoginPage() {
	const phoneOptions = await getPhoneOptions();

	return <LoginFormContainer phoneOptions={phoneOptions} />;
}
