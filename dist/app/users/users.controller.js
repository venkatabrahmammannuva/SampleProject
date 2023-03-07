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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_helpers_1 = __importDefault(require("../../helpers/response.helpers"));
const users_repo_1 = __importDefault(require("./users.repo"));
const auth_helpers_1 = __importDefault(require("../auth/auth.helpers"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const exceljs_helpers_1 = __importDefault(require("../../helpers/exceljs.helpers"));
class userController {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const output = {};
                let _a = req.body, { password } = _a, body = __rest(_a, ["password"]);
                const salt = yield auth_helpers_1.default.createSalt();
                const password_hash = yield auth_helpers_1.default.createHash(salt, password);
                body.salt = salt;
                body.password_hash = password_hash;
                const data = yield users_repo_1.default.createUser(body);
                if (data && data.err) {
                    const err = new Error(data.err.message);
                    err.statusCode = data.err.statusCode;
                    throw err;
                }
                output.message = data === null || data === void 0 ? void 0 : data.message;
                output.result = data === null || data === void 0 ? void 0 : data.result;
                res
                    .status(http_status_codes_1.default.OK)
                    .json(yield response_helpers_1.default.successResponse(output));
            }
            catch (error) {
                console.log(error);
                res
                    .status(error.statusCode || 500)
                    .json(yield response_helpers_1.default.validationErrorResponse(error));
            }
        });
    }
    download(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield users_repo_1.default.download();
                return yield exceljs_helpers_1.default.downloadUsersData(users, res);
            }
            catch (error) {
                console.log(error);
                res
                    .status(error.statusCode || 500)
                    .json(yield response_helpers_1.default.validationErrorResponse(error));
            }
        });
    }
    upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sheetData = yield exceljs_helpers_1.default.uploadData();
                // console.log(sheetData)
                res.status(http_status_codes_1.default.OK).json({
                    status: "success",
                });
            }
            catch (error) {
                console.log(error);
                res
                    .status(error.statusCode || 500)
                    .json(yield response_helpers_1.default.validationErrorResponse(error));
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield users_repo_1.default.list(req);
                res
                    .status(http_status_codes_1.default.OK)
                    .json(yield response_helpers_1.default.successResponse(data));
            }
            catch (error) {
                res
                    .status(error.statusCode || 500)
                    .json(yield response_helpers_1.default.validationErrorResponse(error));
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const body = req.body;
                const data = yield users_repo_1.default.update(id, body);
                res
                    .status(http_status_codes_1.default.OK)
                    .json(yield response_helpers_1.default.successResponse(data));
            }
            catch (error) {
                res
                    .status(error.statusCode || 500)
                    .json(yield response_helpers_1.default.validationErrorResponse(error));
            }
        });
    }
}
exports.default = new userController();
