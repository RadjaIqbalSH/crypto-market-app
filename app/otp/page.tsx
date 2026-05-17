import { cookies } from "next/headers";
import { OtpFormContainer } from "@/app/otp/OtpFormContainer";
import { parsePendingAuthCookie, PENDING_AUTH_COOKIE } from "@/auth";

export default async function OtpPage() {
	const cookieStore = await cookies();
	const pendingAuth = parsePendingAuthCookie(
		cookieStore.get(PENDING_AUTH_COOKIE)?.value
	);

	if (!pendingAuth) {
		return null;
	}

	return <OtpFormContainer pendingAuth={pendingAuth} />;
}
