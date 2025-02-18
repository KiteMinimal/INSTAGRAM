const jwt = require("jsonwebtoken")
const config = require("../config/config")
const userModel = require("../models/user.model")



module.exports.authUser = async (req, res, next) => {

    try {


        const token = req.headers.authorization.split(" ")[ 1 ]

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = userModel.verifyToken(token)

        const user = await userModel.findOne({
            _id: decoded.id
        }).lean()

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = user

        next()

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}