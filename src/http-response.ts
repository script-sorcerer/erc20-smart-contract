export class HttpResponse<TData> {
	readonly code: number;
	readonly success: boolean;
	readonly data?: TData;
	readonly message?: string;

	constructor({
		code,
		success,
		data,
		message
	}: {
		code: number;
		success: boolean;
		data?: TData;
		message?: string;
	}) {
		this.code = code;
		this.success = success;
		this.data = data;
		this.message = message;
	}

	static ok<TData>(data?: TData) {
		return new HttpResponse<TData>({
			code: 0,
			success: true,
			data
		});
	}

	static error(message: string) {
		return new HttpResponse<never>({
			code: 1,
			success: false,
			message
		});
	}
}
