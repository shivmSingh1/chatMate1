import React from 'react'
import { useState } from 'react'
import { POST } from '../../axios/axios.request';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
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
            const res = await POST('/api/auth/signup', userData)
            if (res.status === 200) {
                console.log("submited")
                navigate("/login")
            }
        } catch (error) {
            console.log("handle submit error", error.message)
        }
    }

    return (
        <div className="container py-5" style={{ maxWidth: "450px" }}>
            <div className="card p-4 shadow-sm rounded">
                <h3 className="text-center mb-4">Sign Up</h3>
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div>
                        <label htmlFor="userName" className="form-label">Username</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Enter full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInput}
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );

}

export default Signup