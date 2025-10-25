import React, { useState } from 'react'
import { POST } from '../../axios/axios.request';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    userName: "",
    password: ""
  })

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await POST('/api/auth/login', userData)
      console.log('resssssss', res)
      if (res.status === 200) {
        setLoading(false)
        console.log("submited")
        navigate("/")
      }
    } catch (error) {
      setLoading(false)
      console.log("handle submit error", error.message)
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ minWidth: "320px", maxWidth: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username</label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={handleInput}
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInput}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            {loading ? <Spinner animation="border" role="status" /> : "Login"}
          </button>
        </form>

        {/* Signup link section */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary text-decoration-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );

}

export default Login