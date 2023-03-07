"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uc = __importStar(require("upper-case"));
// Create Express Server
const route = (0, express_1.default)();
// route.use(morgan('dev'));
//configure apicache 
// let cache = apicache.middleware
//caching all routes for 5 minutes
// route.use(cache('5 minutes'))
// route.get('/', (req, res) => {
//     const data = axios.get(
//     'https://jsonplaceholder.typicode.com/posts').then((response) => {
//         console.log("Caching Posts API.....")
//         res.send(response.data.repeat(2))
//     })
// })
// route.get('/users', (req, res) => {
//     const userData = axios.get(
//     'https://jsonplaceholder.typicode.com/users').then((response) => {
//         console.log("Caching Users API.....")
//         res.send(response.data)
//     });
// })
route.get("/list", (req, res) => {
    res.send(uc.upperCase("Hello World!!!"));
});
exports.default = route;
