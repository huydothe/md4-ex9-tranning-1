import {Schema, model} from 'mongoose';


const userSchema = new Schema({
    username : String,
    password : String,
    google:{
        id:{
            type:String
        }
    }
});
///aa

const UserModel = model('user',userSchema);

export {UserModel};