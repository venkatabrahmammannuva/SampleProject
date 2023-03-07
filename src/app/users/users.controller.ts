import { NextFunction, Response } from "express";
import response from "../../helpers/response.helpers";
import userRepo from "./users.repo";
import authHelpers from "../auth/auth.helpers";
import statusCodes from "http-status-codes";
import exceljsHelpers from "../../helpers/exceljs.helpers";

class userController {
    async createUser(req: any, res: Response, next: NextFunction){
        try{
            const output:any = {};
            let {password, ...body} = req.body
            const salt = await authHelpers.createSalt()
            const password_hash = await authHelpers.createHash(salt,password)
            body.salt = salt
            body.password_hash = password_hash
            const data:any = await userRepo.createUser(body);
            if (data && data.err) {
                const err: any = new Error(data.err.message);
                err.statusCode = data.err.statusCode;
                throw err;
            }
            output.message = data?.message
            output.result = data?.result

            res
			    .status(statusCodes.OK)
			    .json(await response.successResponse(output));
        }catch(error:any){
            console.log(error)
            res
				.status(error.statusCode || 500)
				.json(await response.validationErrorResponse(error));
        }

    }
    async download(req: any, res: Response, next: NextFunction){
        try{
            const users = await userRepo.download()

            return await exceljsHelpers.downloadUsersData(users,res)
        }catch(error:any){
            console.log(error);
			res
				.status(error.statusCode || 500)
				.json(await response.validationErrorResponse(error));
        }

    }

    async upload(req: any, res: Response, next: NextFunction){
        try{
            const sheetData = await exceljsHelpers.uploadData()
            // console.log(sheetData)
            res.status(statusCodes.OK).json({
				status: "success",
			});
        }catch(error:any){
            console.log(error)
            res
				.status(error.statusCode || 500)
				.json(await response.validationErrorResponse(error));
        }
    }

    async list(req: any, res: Response, next: NextFunction){
        try{
            const data = await userRepo.list(req)
            res
			    .status(statusCodes.OK)
			    .json(await response.successResponse(data));
        }catch(error:any){
            res
				.status(error.statusCode || 500)
				.json(await response.validationErrorResponse(error));
        }
    }

    async update(req: any, res: Response){
        try{
            const id = req.params.id
            const body = req.body
            const data = await userRepo.update(id,body)
            res
                .status(statusCodes.OK)
                .json(await response.successResponse(data))
        }catch(error:any){
            res
            .status(error.statusCode || 500)
            .json(await response.validationErrorResponse(error)); 
        }
    }

}

export default new userController();