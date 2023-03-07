"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("../app/users/users.route"));
const app = express_1.default.Router();
app.use("/user", users_route_1.default);
module.exports = app;
