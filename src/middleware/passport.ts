import passport from 'passport';
import {UserModel} from "../schemas/user.model";
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth2';


passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await UserModel.findOne({username: username});
    if (!user) {
        return done(null, false)
    } else {
        if (user.password === password) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }
}));

passport.use(new GoogleStrategy({

        clientID: "your_client_id",
        clientSecret: "your_client_secret",
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile,'profile')
            let existingUser = await UserModel.findOne({
                'google.id':profile.id
            });
            if(existingUser){
                return done(null,existingUser);
            }
            console.log(`Create new user ...`);
            const newUser = new UserModel({
                google:{
                    id:{
                        id : profile.id
                    }
                },
                username: profile.emails[0].value,
                password: null
            })
            await newUser.save();
            console.log(newUser,'newUser');
            return done(null, newUser);
        }catch(err){
            return done(null,false);
        }
    }
))

export default passport