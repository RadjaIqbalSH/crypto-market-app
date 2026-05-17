export interface ICountry {
	name: string;
	code: string;
	dial_code: string;
}

export interface ICountriesResponse {
	success: boolean;
	message: string;
	data: ICountry[];
}
