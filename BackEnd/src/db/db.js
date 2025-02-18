const mongoose = require("mongoose")
const config = require("../config/config")


function connect() {
    mongoose.connect(config.MONGO_URI)
        .then(() => {
            console.log("DB connected")
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = connect