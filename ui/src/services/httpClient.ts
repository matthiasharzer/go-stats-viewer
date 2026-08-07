

class HttpError extends Error {
	response: Response;

	constructor(response: Response) {
		super(`HTTP Error: ${response.status} ${response.statusText}`);
		this.response = response;
	}

	get status(): number {
		return this.response.status;
	}
}

class HttpClient {
	async fetch(url: string, options: RequestInit): Promise<Response> {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new HttpError(response);
		}

		return response;
	}

	async runQuery<T>(url: string, signal: AbortSignal): Promise<T> {
		const response = await this.fetch(url, {
			method: 'GET',
			signal,
		});

		if (!response.ok) {
			throw new Error(await response.text());
		}

		return (await response.json()) as T;
	}

	async runCommand<T>(
		url: string,
		requestBody: Record<string, unknown>,
		signal: AbortSignal,
	): Promise<T> {
		const response = await this.fetch(url, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(requestBody),
			signal,
		});

		return (await response.json()) as T;
	}
}

export const httpClient = new HttpClient();
export type { HttpClient };
export { HttpError };
