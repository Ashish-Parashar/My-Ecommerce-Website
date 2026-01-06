import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup({ setrole }) {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate();

    const API_BASE = "https://backend-jvcj.onrender.com/api";


    const collectData = async () => {

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        let result = await fetch(`${API_BASE}/auth/signup`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        result = await result.json()
        console.log(result)
        localStorage.setItem('user', JSON.stringify(result))
        localStorage.setItem('token', result.token);
        setrole(result?.user?.role);

        navigate('/')

    }
    return (

        <div className=" flex  justify-center bg-gradient-to-r  px-4 py-10">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-5">
                    Create an <span className="text-purple-600">Account</span>
                </h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium text-sm">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setname(e.target.value)
                            }}
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-sm transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 font-medium text-sm">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value)
                            }}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-sm transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1 font-medium text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value)
                            }}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-sm transition"
                        />
                    </div>

                    <button className="mt-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition text-sm"
                        onClick={collectData}
                    >
                        Sign Up
                    </button>
                </div>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Already have an account?{" "}
                    <Link className="text-purple-600 font-medium hover:underline" to='/login'>  Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
