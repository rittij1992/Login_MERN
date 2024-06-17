const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registeUser = async (req, res) => {
    try {
        const { name, email_id, password } = req.body;
        /*input of user info taken*/
        const userExist = await Users.findOne({ email_id });

        if (userExist) {
            res.status(200).json({
                message: "User already exists!"
            });
            //If user already exist, respose with 409 conflict error, user exists.
            //else create new user

        } else {

            const hashPassword = await bcrypt.hash(password, 10);
            /*Password encryption*/

            const user = new Users({
                name,
                email_id,
                password: hashPassword
            });
            /*New user info model creation*/

            const data = await user.save();
            /*New user saved*/

            res.status(200).json({
                message: 'User registered successfully...login now!',
                data
            });
            /*New user regiter message*/
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}




exports.loginUser = async (req, res) => {
    try {
        const { email_id, password } = req.body;
        /*input of user name and password taken*/

        const user = await Users.findOne({ email_id });
        if (!user) {
            return res.status(400).json({ message: "Invalid user name" })
        }
        /*user name validation*/

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid user name or password" })
        }
        /*user password validation*/

        const token = jwt.sign(
            { userId: user._id, userName: user.email_id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        /*token generation for login*/

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });
        /*Final login message*/

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


exports.getUser = async (req, res) => {
    try {
        const user = await Users.findById({ userID });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User found',
            name: user.name,
            email: user.email_id

        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}