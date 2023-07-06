import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors'
const session = require('express-session');
require('dotenv').config();
let app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(cors({origin: true}));
//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

viewEngine(app);
initWebRoutes(app);

connectDB(); 

let port = process.env.PORT || 6969;
app.listen(port, () =>{
    console.log("Backend Nodejs is running on port: " + port)
})