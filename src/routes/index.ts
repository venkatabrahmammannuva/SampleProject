import express from "express";
import auth from "../app/auth/auth.route";
import user from "../app/users/users.route";

const app = express.Router();

app.use("/user",user)

export = app;