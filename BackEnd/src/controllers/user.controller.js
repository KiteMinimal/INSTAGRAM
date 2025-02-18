const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/config')

module.exports.registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username) {
            return res.status(400).json({ message: "username is required" })
        }

        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }

        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }


        const isUserExist = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" })
        }


        const hashedPassword = await userModel.hashPassword(password)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = user.generateToken()


        res.status(201).json({ token, user })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }

}


module.exports.loginUserController = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }

        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }

        const isUserExist = await userModel.findOne({ email })

        if (!isUserExist) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await isUserExist.comparePassword(password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }


        const token = isUserExist.generateToken()

        res.status(200).json({ token, user: isUserExist })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }


}



module.exports.profileUserController = async (req, res) => {

    const user = await userModel.findById(req.user._id).populate("posts")
    res.send(user)

}