import express from "express";
import passport from "passport";
import multer from 'multer';


const router = express.Router();
const upload = multer();

router.get('/login',(req, res) => {
    res.render('login');
});

router.post('/login', upload.none(), (req,res, next)=>{
    console.log(req.body);
    passport.authenticate('local',(err,user)=>{
        if(err){
            return next(err)
        }
        if(!user){
            console.log(req.body)
            res.send('Wrong email or password');
        }
        req.login(user,()=>{
            res.send('you are authenticated');
        })
    })(req,res,next)
})

export default router;