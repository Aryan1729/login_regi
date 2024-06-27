import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            setLoading(true);
            const result = await axios.post('http://localhost:3001/login', { email, password });
            if (result.data === "Success") {
                navigate('/home');
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-4 rounded shadow w-25">
                <h2 className="mb-4 text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-center mt-3">Don't Have an Account?</p>
                    <Link to="/register" className="btn btn-outline-secondary w-100 rounded-0">
                        Register
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
