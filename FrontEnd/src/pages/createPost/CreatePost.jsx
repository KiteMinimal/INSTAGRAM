import React, { useState } from 'react'
import './CreatePost.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const [media, setMedia] = useState("")
    const [caption, setCaption] = useState("")
    const [error, setError] = useState("")
    const token = localStorage.getItem('token')

    const navigate = useNavigate();

    function createPost(event) {
        event.preventDefault()
        axios.post('http://localhost:3000/posts/create',{
            media,
            caption
        }, {

            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => {
            navigate('/profile')
        })
        .catch(err => {
            if(err.response.data?.message)
              setError(err.response.data.message)
        })

    }


  return (
    <main>
        <section className="create-post">
        <form onSubmit={createPost}>
          <div className="input-group">
            <label htmlFor="media">Media</label>
            <input
              onChange={(e) => setMedia(e.target.value)}
              value={media}
              type="media"
              id="media"
              name="media"
              placeholder="URL"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="caption">Caption</label>
            <input
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              type="caption"
              id="caption"
              name="caption"
              placeholder="Caption"
              required
            />
          </div>

          <button type="submit">Create Post</button>
        </form>
        {error && <div className="error">{error}</div>}
      </section>
    </main>
  )
}

export default CreatePost