import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../Feature/addtocart';
import { FaCartArrowDown } from "react-icons/fa";


function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [showViewCart, setshowViewCart] = useState(null)
    const dispatch = useDispatch();
    const ProductsUrl = 'http://localhost:5000/api/products';

    const getData = async () => {
        try {
            const res = await fetch(ProductsUrl);
            const result = await res.json();
            const found = result.find((item) => item._id === id);
            setProduct(found);
            if (found?.image) setMainImage(`http://localhost:5000${found.image}`);
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addtoCart(product));
    };

    if (!product)
        return <p className="text-center mt-20 text-gray-500">Loading product...</p>;

    return (
        <div className="flex justify-center flex-col bg-gray-100  relative  w-[100%] min-h-screen">
            <div
                className={` flex px-10 absolute top-5 right-5 w-[100%]  z-20 transition-all duration-300 
        ${showViewCart ? "flex translate-y-0" : "hidden -translate-y-5 pointer-events-none"}`}
            >
                <div className="bg-white shadow-xl flex  flex-wrap justify-between items-center  border rounded-xl p-4 w-[100%]">
                    <p className="font-semibold text-gray-800">
                        ✅  {product.title} added to cart!
                    </p>
                    <Link
                        to="/cart"
                        className="block mt-3 text-center w-[100px] bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                        onClick={() => {
                            setshowViewCart(false)

                        }}
                    >
                        View Cart
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row  rounded-2xl overflow-hidden w-full ">
                {/* Left: Image Section */}
                <div className="md:w-1/2 flex flex-col items-center justify-start  p-6">
                    <div className="w-full max-w-md bg-white rounded-lg overflow-hidden flex items-center justify-center border">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="object-contain w-full h-[400px] sm:h-[500px] transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Gallery Thumbnails */}

                    <div className='flex gap-2 mt-3'>
                        <img
                            src={`http://localhost:5000${product.image}`}
                            onClick={() =>
                                setMainImage(`http://localhost:5000${product.image}`)
                            }
                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${mainImage === `http://localhost:5000${product.image}`
                                ? 'border-blue-500 scale-105'
                                : 'border-transparent hover:scale-105 hover:border-gray-300'
                                }`}
                        />

                        {product.gallery && product.gallery.length > 0 && (
                            <div className="flex flex-wrap  gap-2 ">
                                {product.gallery.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:5000${image}`}
                                        alt={`Gallery ${index}`}
                                        onClick={() =>
                                            setMainImage(`http://localhost:5000${image}`)
                                        }
                                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${mainImage === `http://localhost:5000${image}`
                                            ? 'border-blue-500 scale-105'
                                            : 'border-transparent hover:scale-105 hover:border-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Details Section */}
                <div className="md:w-1/2 flex flex-col justify-between p-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                            {product.title}
                        </h1>

                        <p className="text-gray-800 text-3xl font-semibold mb-1">
                            ₹{product.price}
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">
                                Product details
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {product.description.split(',').map((line, idx) => (
                                    <li key={idx}>{line.trim()}</li>
                                ))}
                            </ul>
                        </p>

                        {product.about && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    About this product
                                </h2>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    {product.about.split(',').map((line, idx) => (
                                        <li key={idx}>{line.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <button
                            onClick={() => {
                                handleAddToCart(product)
                                setshowViewCart(true)
                            }

                            }
                            className="bg-gray-200 text-gray-800 flex gap-1 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto"
                        >
                            Add to Cart
                            <FaCartArrowDown
                                className='text-[24px]'
                            />
                        </button>
                        <Link to="/checkout" className="w-full sm:w-auto">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full"
                            >
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SingleProduct;
