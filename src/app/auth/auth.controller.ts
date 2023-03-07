import { NextFunction, Response } from "express";
import response from "../../helpers/response.helpers";
import authRepo from "./auth.repo"
class authController {
    async login(req: any, res: Response, next: NextFunction){
        const body = req.body
        // const output = await 
    }
}

export default new authController();