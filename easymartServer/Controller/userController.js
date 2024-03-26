const users = require('../Model/userModel');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return res.status(406).json("User Exists, Please Login");
        } else {
            const newUser = new users({
                email: email,
                username: username,
                password: password
            });
            await newUser.save();
            return res.status(200).json("User Signup is Successful");
        }
    } catch (err) {
        return res.status(401).json(err);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({email,password });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY);
            console.log(token);
            return res.status(200).json({existingUser,token});
        } else {
            return res.status(406).json("Invalid email or password");
        }
    } catch (err) {
        return res.status(401).json(err);
    }
};
