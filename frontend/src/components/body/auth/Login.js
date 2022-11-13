import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      alert("Logged in successfully");
      navigate("/");
      window.location.reload();
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login_page" style={{ marginTop: "20vh" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          type="text"
          placeholder="Enter email address"
          id="email"
          value={credentials.email}
          name="email"
          onChange={onChange}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          id="password"
          value={credentials.password}
          name="password"
          onChange={onChange}
        />

        <div className="row">
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        New Member? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
