import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

const Profile = () => {

  const [user, setUser] = useState({})

  function getProfileData() {
    axios.get('http://localhost:3000/users/profile', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    }).then(res => {
        setUser(res.data)
    }).catch(err => {
        console.log(err.response.data)
    })
  }

  useEffect(() => getProfileData(), []);

  return (
    <main>
      <section className="profile-view">
        <div className="top">
          <div className="profileImage">
            <img
              src={user.profileImage}
              alt=""
            />
          </div>
          <h1>{user.username}</h1>
        </div>

        <div className="bottom">
          <div className="posts">
            
              
            {user.posts?.map(post => {
              return (
                <div className="post" key={post._id}>
                  <img
                    src={post.image}
                    alt=""
                  />
                  <div className="caption">
                    <h3>{post.username}</h3>
                    <p>{post.caption}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
