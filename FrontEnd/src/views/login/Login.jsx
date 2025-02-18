import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3000/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);

        // navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occurred");

        if (err.response.data?.message) {
          setError(err.response.data.message);
        }
      });
  }

  return (
    <main>
      <section className="register-view">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
      </section>
    </main>
  );
};

export default Register;
