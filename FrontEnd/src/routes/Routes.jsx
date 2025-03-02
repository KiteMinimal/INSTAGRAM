import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from '../pages/register/Register'
import Profile from '../pages/profile/Profile'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
// import UserSocket from '../pages/Socket/UserSocket'
import CreatePost from '../pages/createPost/CreatePost'
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