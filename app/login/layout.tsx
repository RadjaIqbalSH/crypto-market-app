import React, { ReactNode } from "react";

export interface ILayoutLoginProps {
	children: ReactNode;
}

export default function LayoutLogin(props: ILayoutLoginProps) {
	// props
	const { children } = props;

	return <div>{children}</div>;
}
