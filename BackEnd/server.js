require("dotenv").config()
const app = require("./src/app")
const config = require("./src/config/config")
const connect = require("./src/db/db")
const http = require('http')
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

connect()

// Socket.io
io.on('connection', (socket) => {
    console.log('A new user has connected ', socket.id)

    socket.on("createMessage", (message) => {
        console.log('New message from ', socket.id, message)
        io.emit("newMessage", message)
    })

    socket.on("disconnect", () => {
        console.log("client disconnected")
    })
})


server.listen(config.PORT, () => {
    console.log("server is running on port " + config.PORT)
})