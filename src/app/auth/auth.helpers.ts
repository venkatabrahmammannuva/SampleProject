import crypto from "crypto";

class AuthHelper {
    async  createSalt(){
        const salt = crypto.randomBytes(254).toString("base64");
        return salt;
    }
    async createHash(salt:any, password: any){
        const plain = salt + " " + password;
		let buffer: any = Buffer.from(plain);
		let hash = crypto
			.createHash("SHA512")
			.update(buffer, "utf-8")
			.digest("base64");

		return hash;
    }
}

export default new AuthHelper();