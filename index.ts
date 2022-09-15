import express from 'express';
import bodyParser from "body-parser";
import * as mongoose from "mongoose";
import multer from 'multer'
import ejs from 'ejs'
import authRouter from "./src/router/authRouter";
import session from "express-session";
import passport from "./src/middleware/passport";

const port = 3000;
const upload = multer();
const app = express();
app.set('view engine','ejs');
app.set("views",'./src/views');
app.use(bodyParser.json());
const DB_URL = 'mongodb://localhost:27017/test';
mongoose.connect(DB_URL)
    .then(()=>{
        console.log(`Connected`)
    }).catch(err =>{
    console.log(err.message)
});
app.use(session({
    secret:'SECRET',
    resave : false,
    saveUninitialized : true,
    cookie:{maxAge:60*60*1000}
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRouter);
app.use(express.urlencoded({extended:false}));


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})