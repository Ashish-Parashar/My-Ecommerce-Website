import React, { useState, useEffect } from 'react';
import Addcategory from './addcategory';

function ProductCategory() {
    const [category, setCategory] = useState([]);
    const [newName, setNewName] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setcurrentPage] = useState(1)
    const [totalcategory] = useState(10);
    const [showConfirm, setshowConfirm] = useState(false)


    const ProductsUrl = 'http://localhost:5000/api/categories';


    const getData = async () => {

        try {
            const res = await fetch(ProductsUrl);
            const result = await res.json();
            setCategory(result);
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    const deleteCategory = async (id) => {
        try {
            const res = await fetch(`${ProductsUrl}/${id}`, { method: 'DELETE' });
            const data = await res.json();
            alert(data.message || "Category Deleted!");
            getData();
        } catch (error) {
            console.error(error);
        }
    };

    const updateCategory = async (id) => {
        if (!newName.trim()) return alert("Please enter a new name!");
        try {
            const res = await fetch(`${ProductsUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });
            const data = await res.json();
            alert(data.message || "Category updated!");
            setNewName('');
            setEditCategory(null);
            getData();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getData(); }, []);

    const filteredCategory = category.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastindexofCategory = totalcategory * currentPage;
    const firstindexofCategory = lastindexofCategory - totalcategory;
    const currentCategory = filteredCategory.slice(firstindexofCategory, lastindexofCategory)
    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Category List</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search category..."
                        className="border px-3 py-2 rounded-md w-full sm:w-auto focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Addcategory />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">#</th>
                            <th className="py-2 px-4 border-b text-left">Category</th>
                            <th className="py-2 px-4 border-b text-left">Created At</th>
                            <th className="py-2 px-4 border-b text-left">Updated At</th>
                            <th className="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCategory.map((cat, index) => (
                            <tr key={cat._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">
                                    {editCategory === cat._id ? (
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="border p-1 rounded w-full"
                                        />
                                    ) : (
                                        cat.name
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">{new Date(cat.createdAt).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b">{new Date(cat.updatedAt).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b flex flex-wrap gap-2">
                                    {editCategory === cat._id ? (
                                        <>
                                            <button
                                                onClick={() => updateCategory(cat._id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditCategory(null)}
                                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => { setEditCategory(cat._id); setNewName(cat.name); }}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setshowConfirm(true)

                                                }
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                                <div className=' '>
                                    {showConfirm &&
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                                            <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
                                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Product?</h2>
                                                <p className="text-sm text-gray-500 mb-4">
                                                    Are you sure you want to delete this Category? This action cannot be undone.
                                                </p>
                                                <div className="flex justify-center space-x-3">
                                                    <button
                                                        onClick={() => {
                                                            setshowConfirm(false)
                                                        }}
                                                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            deleteCategory(cat._id)
                                                            setshowConfirm(false)

                                                        }}
                                                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4 space-x-3 relative z-0">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setcurrentPage(prev => prev - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition "
                    >
                        Prev
                    </button>

                    {Array.from({ length: Math.ceil(category.length / totalcategory) }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setcurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === Math.ceil(category.length / totalcategory)}
                        onClick={() => setcurrentPage(prev => prev + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;
