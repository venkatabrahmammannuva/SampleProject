"use strict";

class ResponseHelper {
	//
	// Success Format the response
	//
	async successResponse(data: any) {
		let responseFormat: any = {
			status: "success",
			data: data.result,
		};

		if ("meta" in data) {
			responseFormat.meta = data.meta;
		}

		if ("message" in data) {
			responseFormat.message = data.message;
		}

		return responseFormat;
	}

	//
	// Format Validation error response
	//
	async validationErrorResponse(data: any) {
		let validationErrorFormat: any = {
			status: "error",
		};

		if ("validationErrors" in data) {
			validationErrorFormat.errors = data.validationErrors;
		}

		if ("message" in data) {
			validationErrorFormat.message = data.message;
		}

		return validationErrorFormat;
	}

	//
	// create the chunks
	//
	async splitToBulks(arr: any[], bulkSize: number) {
		const bulks = [];
		for (let i = 0; i < Math.ceil(arr.length / bulkSize); i++) {
			bulks.push(arr.slice(i * bulkSize, (i + 1) * bulkSize));
		}
		return bulks;
	}
}

export default new ResponseHelper();