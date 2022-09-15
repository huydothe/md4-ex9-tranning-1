import {Schema, model} from 'mongoose';


const userSchema = new Schema({
    username : String,
    password : String
});

const UserModel = model('user',userSchema);

export {UserModel};