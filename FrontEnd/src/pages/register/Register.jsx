import React, { useEffect } from 'react'
import './register.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [ username, setUsername ] = useState("")
    const [ profileImage, setProfileImage ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const Navigate = useNavigate()

    // useEffect(() => {
    //     socket.on('error', (err) => console.log(err))
    //     socket.on('connect', () => {
    //         console.log('Connected to socket server')
    //     })

    //     socket.on('disconnect', () => {
    //         console.log('Disconnected from socket server')
    //     })

    //     return () => socket.disconnect()
    // }, [socket])

    function handleSubmit(e) {
        e.preventDefault()

        axios.post('http://localhost:3000/users/register', {
            username,
            profileImage,
            email,
            password
        })
            .then(res => {
                const data = res.data
                localStorage.setItem('token', data.token)
                Navigate('/profile')
            })
            .catch((error)=> {
                    setError(error.response.data.message)
            })
    }

    return (
        <main>
            <section className='register-view'>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={e => setUsername(e.target.value)} value={username} id='username' type="text" placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="profileImage">Profile Image</label>
                        <input onChange={e => setProfileImage(e.target.value)} value={profileImage} id='profileImage' type="text" placeholder='Enter URL' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} id='email' type="email" placeholder='Enter email' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} id='password' type="password" placeholder='Enter password' />
                    </div>
                    <button  type='submit'>Register</button>
                </form>

                {error && <div className="error">{error}</div>}

            </section>
        </main>
    )
}

export default Register