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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class userRepo {
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, database_1.default)("users").insert(body);
                if (!data) {
                    return {
                        err: {
                            message: "Unable to create User.",
                            statusCode: http_status_codes_1.default.BAD_REQUEST,
                        },
                    };
                }
                else {
                    return {
                        message: "User created successfully.",
                        result: { id: data[0] },
                    };
                }
            }
            catch (error) {
                return {
                    err: {
                        message: "Unable to create user due to Invalids.",
                        statusCode: http_status_codes_1.default.BAD_REQUEST
                    },
                };
            }
        });
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, database_1.default)("users").select("first_name", "last_name", "email", "date_of_birth", "created_at");
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    list(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, database_1.default)("users").whereNull("updated_at");
                // .modify((query)=>{
                // if(req.param.id){
                //     query.where({id:req.params.id})
                // }
                // })
                return {
                    message: "Users fetched successfully.",
                    result: data
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new userRepo();
