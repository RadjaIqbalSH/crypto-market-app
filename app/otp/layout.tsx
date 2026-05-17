import AuthTemplate from "@/components/templates/AuthTemplate";
import React, { ReactNode } from "react";

interface ILayoutOTPProps {
	children: ReactNode;
}

export default function LayoutOTP(props: ILayoutOTPProps) {
	// props
	const { children } = props;

	return (
		<AuthTemplate image="/images/bg-phone.webp">{children}</AuthTemplate>
	);
}
