import knex from "../../config/database";
import config from "../../config/constant";
import statusCodes from "http-status-codes";

class userRepo {
    async createUser(body:any){

        try{
            const data = await knex("users").insert(body)
            if(!data){
				return {
					err: {
						message: "Unable to create User.",
						statusCode: statusCodes.BAD_REQUEST,
					},
				};
            }else{
                return {
                    message: "User created successfully.",
                    result: {id:data[0]},
                };
         }

        }catch(error){
            return {
                err: {
                    message: "Unable to create user due to Invalids.",
                    statusCode: statusCodes.BAD_REQUEST
                },
            };
        }
    }
    async download(){
        try{
            const data = await knex("users").select(
                "first_name","last_name","email","date_of_birth","created_at"
            )
            return data
        }catch(error){
            throw error;
        }
    }

    async list(req:any){
        try{
            const data = await knex("users").whereNull("updated_at");
            // .modify((query)=>{
                // if(req.param.id){
                //     query.where({id:req.params.id})
                // }
            // })
            return {
                message:"Users fetched successfully.",
                result:data
            }
        }catch(error){
            throw error;
        }
    }

    async update(id: number, body: any){
        
    }

}

export default new userRepo();