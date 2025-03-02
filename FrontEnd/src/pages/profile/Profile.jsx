import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Compass,
  Video,
  MessageSquare,
  Heart,
  PlusSquare,
  User,
  Menu,
} from "lucide-react"; // Importing icons

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function getProfileData() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/register");
    } else {
      getProfileData();
    }
  }, [navigate]);

  if (!user) {
    return <p>Loading profile....</p>;
  }

  function handleHomeRoute() {
    navigate('/')
  }

  function postNavigation() {
    navigate('/create-post')
  }

  return (
    <main className="profile-container">
      <nav className="sidebar">
        <h2>Instagram</h2>
        <ul>
          <li onClick={handleHomeRoute}>
            <Home /> Home
          </li>
          <li>
            <Search /> Search
          </li>
          <li>
            <Compass /> Explore
          </li>
          <li>
            <Video /> Reels
          </li>
          <li>
            <MessageSquare /> Messages <span className="notification">4</span>
          </li>
          <li>
            <Heart /> Notifications
          </li>
          <li onClick={postNavigation}>
            <PlusSquare /> Create
          </li>
          <li>
            <User /> Profile
          </li>
          <li>
            <Menu /> More
          </li>
        </ul>
      </nav>

      {/* Profile View */}
      <div className="profile-view">
        {/* Profile Top Section */}
        <div className="top">
          <div className="profileImage">
            <img src={user.profileImage} alt="" />
          </div>
          <div className="profile-info">
            <h1>{user.username}</h1>
            <div className="stats">
              <span>100 Posts</span>
              <span>5K Followers</span>
              <span>500 Following</span>
            </div>
            <div className="actions">
              <button>Edit Profile</button>
              <button>Share Profile</button>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="highlights">
          <div className="highlight">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww"
              alt="Highlight 1"
            />
            <span>Travel</span>
          </div>
          <div className="highlight">
            <img
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D"
              alt="Highlight 2"
            />
            <span>Food</span>
          </div>
          <div className="highlight">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyaWVuZHN8ZW58MHx8MHx8fDA%3D"
              alt="Highlight 3"
            />
            <span>Friends</span>
          </div>
          <div className="highlight">
            <img
              src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBldHN8ZW58MHx8MHx8fDA%3D"
              alt="Highlight 4"
            />
            <span>Pets</span>
          </div>
          <div className="highlight">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Highlight 5"
            />
            <span>Work</span>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bottom">
          <div className="posts">
            {user.posts?.map((post) => (
              <div className="post" key={post._id}>
                <img src={post.media} alt="" />
                <div className="caption">
                  <h3>{post.username}</h3>
                  <p>{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
