const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Signup
const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {

            return res.status(401).json({
                message: "Invalid password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            "SECRET_KEY",

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            message: "Login successful",
            token

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    register,
    login

};