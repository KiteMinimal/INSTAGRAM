import React, { useEffect, useState } from "react";
import "./Home.css";
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
  Share,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeRouote = () => {
  const stories = [
    {
      username: "aniket_san...",
      img: "https://plus.unsplash.com/premium_photo-1664298807846-b7989767c04e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGJhYnl8ZW58MHx8MHx8fDA%3D",
    },
    {
      username: "official_rih...",
      img: "https://plus.unsplash.com/premium_photo-1661778554627-984e972b4298?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3V0ZSUyMGJhYnl8ZW58MHx8MHx8fDA%3D",
    },
    {
      username: "syedzunai...",
      img: "https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3V0ZSUyMGJhYnl8ZW58MHx8MHx8fDA%3D",
    },
    {
      username: "sagar_kh...",
      img: "https://images.unsplash.com/photo-1630304565858-642d53fa18ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGN1dGUlMjBiYWJ5fGVufDB8fDB8fHww",
    },
    {
      username: "nilesh_s20",
      img: "https://images.unsplash.com/photo-1587752889012-a8dc4999e438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGN1dGUlMjBiYWJ5fGVufDB8fDB8fHww",
    },
    {
      username: "mainly_ayx...",
      img: "https://images.unsplash.com/photo-1610862067133-46b3ef8ec115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGN1dGUlMjBiYWJ5fGVufDB8fDB8fHww",
    },
    {
      username: "sheryians_...",
      img: "https://plus.unsplash.com/premium_photo-1667480556784-a8f27e62104c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGN1dGUlMjBiYWJ5fGVufDB8fDB8fHww",
    },
    {
      username: "nehu283",
      img: "https://images.unsplash.com/photo-1506606401543-2e73709cebb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5pZ2h0fGVufDB8fDB8fHww",
    },
  ];

  const [postUser, setPostUser] = useState([]);

  const navigate = useNavigate();

  function handleProfileView() {
    navigate("./profile");
  }

  function postNavigation() {
    navigate('/create-post')
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/feed", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.posts);
        setPostUser(response.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Instagram</h2>
        <ul>
          <li>
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
          <li onClick={handleProfileView}>
            <User /> Profile
          </li>
          <li>
            <Menu /> More
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Story Highlights */}
        <div className="story-section">
          {stories.map((story, index) => (
            <div key={index} className="story">
              <img src={story.img} alt="story" />
              <span>{story.username}</span>
            </div>
          ))}
        </div>

        {/* Post Section */}
        {postUser.map((post, index) => (
          <div className="post">
            <div key={index} className="post-header">
              <img
                src={post.author.profileImage}
                alt="profile"
              />
              <p>{post.author.username}</p>
            </div>
            <img
              src={post.media}
              alt="Post"
              className="post-img"
            />
            <div className="post-actions">
              <Heart /> <MessageSquare /> <Share />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRouote;
