import express from "express";
import * as uc from "upper-case";
import usersController from "./users.controller";
const router = express.Router();


router.post("/create",usersController.createUser)
router.get("/download",usersController.download)
router.post("/upload",usersController.upload)
router.put('/update/:id',usersController.update)

router.get("/list",usersController.list)
router.get("/server",(req,res)=>{
    res.send(uc.upperCase("Hello World!!!"));
})


export = router;