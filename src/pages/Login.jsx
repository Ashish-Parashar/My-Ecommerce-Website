import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setrole }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Emailvalidation, setEmailvalidation] = useState(false)
    const [Passwordvalidation, setPasswordvalidation] = useState(false)

    const navigate = useNavigate();

    const API_BASE = "http://localhost:5000/api";

    const handleLogin = async () => {

        if (!email) {
            setEmailvalidation(true);
        } else {
            setEmailvalidation(false);
        }

        if (!password) {
            setPasswordvalidation(true);
        } else {
            setPasswordvalidation(false);
        }


        try {
            let res = await fetch(`${API_BASE}/auth/login`, {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-type': 'application/json'
                }
            });


            const result = await res.json()
            if (!res.ok) {
                alert("Invalid email or password")
                return;
            }

            if (result.token) {
                localStorage.setItem('user', JSON.stringify(result))
                localStorage.setItem('token', result.token);
                setrole(result?.user?.role);
                navigate('/')
            }


        }
        catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again later.");
        }

    }
    return (
        <div className=" flex  justify-center bg-gradient-to-r  px-4 py-10">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-5">
                    Welcome Back
                </h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium text-sm">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-sm transition"
                        />
                        {Emailvalidation ? <p className="text-red-400">  Please fill Email</p> : ''}
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 font-medium text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLogin()
                                }
                            }}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-sm transition"
                        />
                        {Passwordvalidation ? <p className="text-red-400"> Please fill Password</p> : ''}

                    </div>

                    <button
                        className="mt-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition text-sm"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account?{" "}
                    <Link className="text-purple-600 font-medium hover:underline" to='/signup'>  Sign up here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
