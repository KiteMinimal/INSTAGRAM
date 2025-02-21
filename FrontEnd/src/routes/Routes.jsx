import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from '../views/register/Register'
import Profile from '../views/profile/Profile'
import Login from '../views/login/Login'
import Home from '../views/home/Home'
// import UserSocket from '../views/Socket/UserSocket'
import CreatePost from '../views/createPost/CreatePost'
import Protected from '../components/Protected'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/usersocket" element={<UserSocket />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/create-post" element={<Protected> <CreatePost /></Protected>} />
                <Route path="/profile" element={<Protected><Profile /></Protected>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes