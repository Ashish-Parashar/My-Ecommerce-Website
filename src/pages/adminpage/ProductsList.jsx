import React from 'react'
import { useState, useEffect } from 'react';
import Addproducts from './addproducts';

function ProductsList() {
    const [products, setproducts] = useState([])
    const [newName, setnewName] = useState('')
    const [newDes, setnewDes] = useState('')
    const [newAbout, setnewAbout] = useState('')
    const [newprice, setnewprice] = useState('')
    const [EditProduct, setEditProduct] = useState(null)
    const [searchProduct, setsearchProduct] = useState('')
    const [currentPage, setcurrentPage] = useState(1)
    const [productsperpage] = useState(5)
    const [showConfirm, setshowConfirm] = useState(false)


    const [Productcategory, setProductcategory] = useState('All')
    const [Editcategory, setEditcategory] = useState([]);
    const [newcategory, setNewcategory] = useState('');


    const ProductsUrl = 'https://backend-jvcj.onrender.com/api/products';
    const categoryUrl = 'https://backend-jvcj.onrender.com/api/categories';


    const token = localStorage.getItem('token');

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await fetch(categoryUrl);
                const data = await res.json();
                setEditcategory(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        getCategory();
    }, []);

    const getData = async () => {
        try {
            const res = await fetch(ProductsUrl)
            const result = await res.json()
            setproducts(result);

        }
        catch (error) {
            console.error(error)
            alert("Something went wrong!");
        }
    }
    useEffect(() => {
        getData()
    }, [products])


    const updateProduct = async (id) => {
        try {
            const res = await fetch(`${ProductsUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newName,
                    description: newDes,
                    about: newAbout,
                    price: newprice,
                    category:newcategory
                })
            })

            const result = await res.json()
            alert(result.message || "Product updated!");
            setnewName('')
            setnewDes('')
            setnewAbout('')
            setnewprice('')
            setEditProduct(null)
            getData()
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${ProductsUrl}/${id}`, {
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${token}`

                }
            })
            const result = await res.json()
            getData()
            alert(result.message || 'Product Deleted')
        }
        catch (error) {
            console.log(error)
        }
    }

    const selectCategory = ['All', ...new Set(products.map((itme) => itme.category.name
    ))]

    const filteredByCategory = Productcategory == 'All' ? products :
        products.filter((item) =>
            item.category.name == Productcategory
        )


    const filterProduct = filteredByCategory.filter((product) =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
    )

    const indexOfLastProduct = currentPage * productsperpage;
    const indexOfFirstProduct = indexOfLastProduct - productsperpage;
    const currentProducts = filterProduct.slice(indexOfFirstProduct, indexOfLastProduct);


    return (
        <>
            <div className="p-2 overflow-x-auto">
                <div className='flex justify-between  items-center'> <h2 className="text-xl font-semibold mb-4">Products List</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search Product..."
                            className="border px-3 py-2 rounded-md w-full sm:w-auto focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            value={searchProduct}
                            onChange={(e) => setsearchProduct(e.target.value)}
                        />
                        <Addproducts />
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full mb-4">
                    <label htmlFor="category" className="text-gray-700 font-medium whitespace-nowrap">
                        Select Category:
                    </label>
                    <select
                        id="category"
                        className="w-60 border border-gray-300 bg-white text-gray-700 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition px-3 py-2 outline-none"
                        value={Productcategory}
                        onChange={(e) => setProductcategory(e.target.value)}
                    >
                        {selectCategory.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-2">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">#</th>
                            <th className="py-2 px-4 border-b text-left">Product Image</th>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Category </th>
                            <th className="py-2 px-4 border-b text-left">Price </th>
                            <th className="py-2 px-4 border-b text-left">Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (

                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{indexOfFirstProduct + index + 1}</td>
                                <td className="py-2 px-4 border-b">
                                    <img
                                        className='w-[50px] h-[50px]'
                                        src={`https://backend-jvcj.onrender.com${product.image}`} alt="" />
                                </td>
                                <td className="py-2 text-[14px]  text-wrap px-4 border-b ">{product.title}</td>
                                <td className="py-2 px-4 border-b">{product.category.name}</td>
                                <td className="py-2 px-4 border-b">{product.price}</td>
                                <td className="py-2 px-4 border-b">{EditProduct !== product._id ?
                                    <>
                                        <button onClick={() => {
                                            setEditProduct(product._id)
                                            setnewName(product.title)
                                            setnewDes(product.description)
                                            setnewAbout(product.about)
                                            setnewprice(product.price)
                                            setNewcategory(product.category)
                                        }}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                // deleteProduct(product._id)
                                                setshowConfirm(true)

                                            }}
                                            className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600 transition"
                                        >Delete</button>
                                    </> :
                                    <>
                                        <button onClick={() => {
                                            updateProduct(product._id)
                                        }}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditProduct(null)
                                            }}
                                            className="bg-gray-400 text-white px-3 py-1 rounded ml-2 hover:bg-gray-500 transition"
                                        >cancel</button>
                                    </>
                                }</td>
                                {EditProduct === product._id && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                                        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl space-y-6 border border-gray-200">

                                            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                                                Edit Product Details
                                            </h2>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                                {/* Product Name */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        Product Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newName}
                                                        onChange={(e) => {
                                                            setnewName(e.target.value)
                                                        }}
                                                        placeholder="Enter product name"
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                                    />
                                                </div>

                                                {/* Category */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                                                    <select
                                                        value={newcategory}
                                                        onChange={(e) => setNewcategory(e.target.value)}
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                                    >
                                                        <option value="">Select Category</option>
                                                        {Editcategory.map((item) => (
                                                            <option key={item._id} value={item._id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Description */}
                                                <div className="sm:col-span-2">
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        rows="2"
                                                        value={newDes}
                                                        onChange={(e) => {
                                                            setnewDes(e.target.value)
                                                        }}
                                                        placeholder="Enter product description"
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                                    />
                                                </div>

                                                {/* About */}
                                                <div className="sm:col-span-2">
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        About this item
                                                    </label>
                                                    <textarea
                                                        rows="2"
                                                        value={newAbout}
                                                        onChange={(e) => {
                                                            setnewAbout(e.target.value)
                                                        }}
                                                        placeholder="Enter about this product"
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                                    />
                                                </div>

                                                {/* Price */}
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        Price ($)
                                                    </label>
                                                    <input
                                                        value={newprice}
                                                        onChange={(e) => {
                                                            setnewprice(e.target.value)
                                                        }}
                                                        type="number"
                                                        placeholder="Enter price"
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                                    />
                                                </div>

                                            </div>

                                            {/* Buttons */}
                                            <div className="pt-4 flex justify-center gap-4 flex-wrap">
                                                <button
                                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition"
                                                    onClick={() => {
                                                        updateProduct(product._id)
                                                    }}
                                                >
                                                    Update Product
                                                </button>

                                                <button
                                                    className="bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-300 hover:scale-105 transition"
                                                    onClick={() => {
                                                        setEditProduct(null)
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )}

                                <div className=' '>
                                    {showConfirm &&
                                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                                            <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
                                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Product?</h2>
                                                <p className="text-sm text-gray-500 mb-4">
                                                    Are you sure you want to delete this product? This action cannot be undone.
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
                                                            deleteProduct(product._id)
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

                    {Array.from({ length: Math.ceil(filteredByCategory.length / productsperpage) }).map((_, i) => (
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
                        disabled={currentPage === Math.ceil(products.length / productsperpage)}
                        onClick={() => setcurrentPage(prev => prev + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                    >
                        Next
                    </button>
                </div>

            </div>



        </>
    )
}

export default ProductsList
