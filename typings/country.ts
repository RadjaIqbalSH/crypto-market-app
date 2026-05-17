import { type ReactNode } from "react";

export interface ICountry {
	name: string;
	code: string;
	dial_code: string;
}

export interface IPhoneCountryOption {
	code: string;
	dialCode: string;
	label: string;
	flag: ReactNode;
}

export interface ICountriesResponse {
	success: boolean;
	message: string;
	data: ICountry[];
}
