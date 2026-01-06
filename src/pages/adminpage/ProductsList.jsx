import React from 'react'
import { useState, useEffect } from 'react';
import Addproducts from './addproducts';

function ProductsList() {
    const [products, setproducts] = useState([])
    const [newName, setnewName] = useState('')
    const [EditProduct, setEditProduct] = useState(null)
    const [searchProduct, setsearchProduct] = useState('')
    const [currentPage, setcurrentPage] = useState(1)
    const [productsperpage] = useState(5)
    const [showConfirm, setshowConfirm] = useState(false)

    const [Productcategory, setProductcategory] = useState('All')


    const ProductsUrl = 'https://backend-jvcj.onrender.com/api/products';
    const token = localStorage.getItem('token');

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
                body: JSON.stringify({ title: newName })
            })

            const result = await res.json()
            alert(result.message || "Product updated!");
            setnewName('')
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
                                <td className="py-2 text-[14px]  text-wrap px-4 border-b ">{EditProduct === product._id ?
                                    <input type="text"
                                        value={newName}
                                        onChange={(e) => {
                                            setnewName(e.target.value)
                                        }}
                                        className="border p-1 rounded w-full"
                                    />
                                    : product.title}</td>
                                <td className="py-2 px-4 border-b">{product.category.name}</td>
                                <td className="py-2 px-4 border-b">{product.price}</td>
                                <td className="py-2 px-4 border-b">{EditProduct !== product._id ?
                                    <>
                                        <button onClick={() => {
                                            setEditProduct(product._id)
                                            setnewName(product.title)
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
