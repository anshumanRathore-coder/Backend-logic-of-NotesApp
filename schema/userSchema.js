import mongoose from 'mongoose';

const userInfoSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already used"]
    },
    username:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already used"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:[8,"Passwor must have minimum 8 numbers"]
    }
})

const UserInfo=mongoose.model('UserInfo',userInfoSchema);
export default UserInfo;