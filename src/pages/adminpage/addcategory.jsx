import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";


function Addcategory() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [showform, setshowform] = useState(false)
    const [category, setcategory] = useState([])


    const getData = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/categories');
            const result = await res.json();
            setcategory(result)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
    }, [])



    const addCategory = async () => {
        if (!name) return setMessage("Category name is required");

        if (category.some((cat) => cat.name.toLowerCase() === name.toLowerCase()
        )) {
            alert("Category with this name already exists!");
            return;
        }
        else {
            try {
                const res = await fetch("http://localhost:5000/api/categories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name })
                });

                const data = await res.json();
                if (res.ok) {
                    setMessage(`Category "${data.name}" added successfully!`);
                    setName("");
                } else {
                    setMessage(data.message || "Error adding category");
                }
            }
            catch (err) {
                console.error(err);
                setMessage("Server error");
            }
        }


    };

    return (
        <>
            <button
                onClick={() => {
                    setshowform(true)
                }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold
                         px-3 py-1 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
                <FaPlus />
                Add Category
            </button>

            {showform &&
                <div className="w-[100%] h-[100vh] bg-black/60 fixed left-0 top-0 z-50">
                    <div className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4 border border-gray-300 z-10">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">
                            Add Category
                        </h2>

                        {message && <p className="text-center text-sm text-green-600">{message}</p>}

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Category Name</label>
                            <input
                                type="text"
                                placeholder="Enter category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            />
                        </div>

                        <div className="pt-4 flex justify-center gap-4 flex-wrap">
                            <button
                                onClick={addCategory}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Add Category
                            </button>

                            <button
                                onClick={() => setshowform(false)}
                                className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-gray-300 hover:scale-105 transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default Addcategory
