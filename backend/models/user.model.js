import mongoose, { Types } from "mongoose";
const userSchema = new mongoose.Schema({
    username: {  
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {  
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
