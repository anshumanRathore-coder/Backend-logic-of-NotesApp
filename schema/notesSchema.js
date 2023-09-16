import mongoose from 'mongoose'

const userNotesSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const UserNotes=mongoose.model('UserNotes',userNotesSchema);
export default UserNotes;