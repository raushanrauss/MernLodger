const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        min: 3,
        required:true
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        min: 8,
        required:true,
    },
    confirmPassword: {
        type: String,
        required:true
    }
})
const userModel=mongoose.model("LodgerUser",userSchema)
module.exports = { userSchema,userModel };