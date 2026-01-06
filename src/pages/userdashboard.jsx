import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart, increaseQuantity, decreaseQuantity } from '../Feature/addtocart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import banner1 from '../assets/beautiful-casual-men-fashion-clothes-set_1339-80888.jpg'
import banner2 from '../assets/leather-shoes-wooden-background_1203-7618.jpg'
import banner3 from '../assets/still-life-with-classic-shirts_23-2150828634.jpg'


function Userdashboard() {
    const [products, setproduct] = useState([])
    const ProductsUrl = 'https://backend-jvcj.onrender.com/api/products';

    const dispatch = useDispatch()

    const getData = async () => {
        try {
            const res = await fetch(ProductsUrl)
            const result = await res.json()
            console.log(result)
            setproduct(result);

        }
        catch (error) {
            console.error(error)
            alert("Something went wrong!");
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function handleAddtocart(product) {
        dispatch(addtoCart(product))
    }

    const banners = [
        banner1,
        banner2,
        banner3
    ];
    

    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                // pagination={{ clickable: true }}
                navigation={true}
                loop={true}
                className="mySwiper"
            >
                {banners.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative w-full h-[350px] md:h-[500px] bg-cover bg-center flex items-center justify-center text-center text-white"
                            style={{ backgroundImage: `url(${img})` }}
                        >
                            {/* Dark overlay for better text contrast */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Text content */}
                            <div className="relative z-10 max-w-2xl px-6">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-wide mb-4 drop-shadow-lg">
                                    Elevate Your Style
                                </h2>
                                <p className="text-sm md:text-lg font-light mb-6">
                                    Discover the latest trends in men’s fashion — be bold, be confident.
                                </p>
                                <button className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition-all">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

          
            <div className="p-4  sm:p-6 lg:p-8 max-w-[1340px] mx-auto">
                {products.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No products available.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                            >
                                {product.image ? (
                                    <div className='p-2 bg-gray-300'>
                                        <Link to={`/product/${product._id}`} >
                                            <img
                                                src={`https://backend-jvcj.onrender.com${product.image}`}
                                                alt={product.title}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </Link>
                                    </div>

                                ) : (
                                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}

                                <div className="p-1 pb-2 sm:p-4 flex flex-col flex-grow text-center">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
                                        <Link to={`/product/${product._id}`} className="hover:text-blue-600 transition-colors">
                                            {product.title}
                                        </Link>
                                    </h2>

                                    <p className="text-gray-800 font-semibold mb-4">₹ {product.price}</p>

                                    <div className="mt-auto w-[100%] flex justify-between gap-2">
                                        <Link to='/checkout'>
                                            <button
                                                onClick={() => handleAddtocart(product)}
                                                className="bg-blue-600 text-white font-medium sm:p-1.5 p-1 rounded-lg text-[12px] hover:bg-blue-700 transition">
                                                Buy Now
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleAddtocart(product)}
                                            className="bg-gray-100 text-gray-800 font-medium sm:p-1.5 p-1 rounded-lg text-[12px] hover:bg-gray-200 transition"
                                        >
                                            Add to Cart
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    )
}

export default Userdashboard
