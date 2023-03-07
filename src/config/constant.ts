import dotenv from "dotenv";
dotenv.config();

const config:any = {
    app:{
        PORT:process.env.PORT,
        DB_NAME:process.env.DB_NAME,
        DB_HOST:process.env.DB_HOST,
        DB_USERNAME:process.env.DB_USERNAME,
        DB_PASSWORD:process.env.DB_PASSWORD,
        DB_PORT:process.env.DB_PORT
    }
}

export default config;