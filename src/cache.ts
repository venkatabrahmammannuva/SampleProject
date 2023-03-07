import express from 'express';
import morgan from "morgan";
import apicache from "apicache";
import axios from 'axios';
import * as uc from "upper-case";
  
// Create Express Server
const route = express();
  
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

route.get("/list",(req, res)=>{
    res.send(uc.upperCase("Hello World!!!"))
})

export default route;