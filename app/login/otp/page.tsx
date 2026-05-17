import { cookies } from "next/headers";
import { OtpFormContainer } from "@/app/login/otp/OtpFormContainer";
import {
	parsePendingAuthCookie,
	PENDING_AUTH_COOKIE,
} from "@/lib/auth-session";

export default async function LoginOtpPage() {
	const cookieStore = await cookies();
	const pendingAuth = parsePendingAuthCookie(
		cookieStore.get(PENDING_AUTH_COOKIE)?.value
	);

	if (!pendingAuth) {
		return null;
	}

	return <OtpFormContainer pendingAuth={pendingAuth} />;
}
