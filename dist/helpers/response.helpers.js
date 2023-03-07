"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    //
    // Success Format the response
    //
    successResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseFormat = {
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
        });
    }
    //
    // Format Validation error response
    //
    validationErrorResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationErrorFormat = {
                status: "error",
            };
            if ("validationErrors" in data) {
                validationErrorFormat.errors = data.validationErrors;
            }
            if ("message" in data) {
                validationErrorFormat.message = data.message;
            }
            return validationErrorFormat;
        });
    }
    //
    // create the chunks
    //
    splitToBulks(arr, bulkSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const bulks = [];
            for (let i = 0; i < Math.ceil(arr.length / bulkSize); i++) {
                bulks.push(arr.slice(i * bulkSize, (i + 1) * bulkSize));
            }
            return bulks;
        });
    }
}
exports.default = new ResponseHelper();
