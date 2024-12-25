import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String , required: true},
    email:{type:String , required: true, unique: true},
    password :{type:String , required: true},
    profilePicture: { type: String }, // Add this field

});

export default mongoose.model('User', UserSchema);