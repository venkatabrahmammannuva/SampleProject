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
const crypto_1 = __importDefault(require("crypto"));
class AuthHelper {
    createSalt() {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = crypto_1.default.randomBytes(254).toString("base64");
            return salt;
        });
    }
    createHash(salt, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const plain = salt + " " + password;
            let buffer = Buffer.from(plain);
            let hash = crypto_1.default
                .createHash("SHA512")
                .update(buffer, "utf-8")
                .digest("base64");
            return hash;
        });
    }
}
exports.default = new AuthHelper();
