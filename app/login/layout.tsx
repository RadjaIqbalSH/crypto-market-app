"use client";

import { usePathname } from "next/navigation";
import AuthTemplate from "@/components/templates/AuthTemplate";
import React, { ReactNode } from "react";

interface ILayoutLoginProps {
	children: ReactNode;
}

export default function LayoutLogin(props: ILayoutLoginProps) {
	// props
	const { children } = props;
	const pathname = usePathname();
	const image =
		pathname.startsWith("/login/otp")
			? "/images/bg-phone.webp"
			: "/images/bg-laptop.webp";

	return <AuthTemplate image={image}>{children}</AuthTemplate>;
}
