import express, { NextFunction,Request,Response} from 'express'
const app = express()

import router from "./routes/index";
// import router from "./cache"

app.use(express.json())
app.use(function(req:Request,res:Response,next:NextFunction){
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, Authorization')
    next()
})
app.use(router)

export default app;