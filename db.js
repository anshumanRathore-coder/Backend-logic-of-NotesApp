import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const connectToDb=()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Succesfully connected to database")
    }).catch((error)=>{
        console.log("Some erro occured in connection to db",error)
    })
}

export {connectToDb};