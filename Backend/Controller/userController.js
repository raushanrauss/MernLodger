const { userModel } = require("../Schema/userSchema");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');
const userRegister = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const hashedPassword=await bcrypt.hash(password,10)
        const user = new userModel({ username, email, password:hashedPassword, confirmPassword:hashedPassword })
        user.save();
        res.status(201).send({ msg: "Register successfully", user });
    }
    catch (error) {
        console.log(error);
    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ msg: "Invalid credentials" });
        }

       
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.secret_key, 
            { expiresIn: '1h' } 
        );
     
       
        res.status(200).send({ msg: "Login successful", token });
    } catch (error) {
        console.error(error); 
        res.status(500).send({ msg: "Internal Server Error" });
    }
}


    module.exports = { userRegister ,userLogin };