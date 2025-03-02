import React from 'react'
import './UserSocket.css'
import { io } from "socket.io-client"

const UserSocket = () => {

    const socket = io("http://localhost:3000")

    function socketIO(e){

        
        socket.emit('joinRoom', 'general')
        socket.on('message', (msg) => console.log(msg))
        socket.on('newUser', (user) => console.log(`New user joined: ${user}`))
        socket.on('userLeft', (user) => console.log(`User left: ${user}`))
        socket.on('error', (err) => console.log(err))
        socket.on('connect', () => {
            console.log('Connected to socket server')
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server')
        })

        return () => socket.disconnect()
    }


  return (
    <div className='main'>
        <label htmlFor="message">Message</label>
        <input type="message" id="message" />
        <button onSubmit={socketIO} type="submit">Send</button>
    </div>
  )
}

export default UserSocket