export interface IPendingAuthCookie {
	method: "email" | "phone";
	otp: string;
	phone: string;
	email?: string;
	token: string;
}

export interface ILoginRequestBody {
	email?: string;
	phone?: string;
	password?: string;
}

export interface ILoginSuccessResponse {
	success: true;
	status_code: number;
	message: string;
	data: {
		otp: string;
		phone: string;
		email?: string;
		token: string;
	};
}

export interface ILoginApiErrorResponse {
	success: false;
	message: string;
	status_code: number;
	data?: {
		field?: "password" | "email" | "phone";
	} | null;
}

export interface IVerifyOtpRequestBody {
	otp?: string;
	phone?: string;
}

export interface IVerifyOtpErrorResponse {
	success: false;
	message: string;
	status_code: number;
	data?: Record<string, never> | null;
}
