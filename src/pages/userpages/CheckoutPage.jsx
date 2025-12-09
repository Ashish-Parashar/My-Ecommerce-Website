import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { totalAmount } from "../../Feature/addtocart";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {

    const cartItems = useSelector((state) => state.addtocart.items);
    const total = useSelector((state) => state.addtocart.totalAmount);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(totalAmount());
    }, [cartItems, dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                        Billing & Shipping Details
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+91 9876543210"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                            <textarea
                                rows="3"
                                placeholder="House No, Street, City, ZIP"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            ></textarea>
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            Order Summary
                        </h2>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div className="flex items-center gap-3">
                                         <Link to={`/product/${item._id}`} >
                                        <img
                                            src={`http://localhost:5000${item.image}`}
                                            alt={item.title}
                                            className="w-14 h-14 object-cover rounded-md border"
                                        />
                                        </Link>
                                        <div>
                                             <Link to={`/product/${item._id}`} >
                                            <h3 className="text-sm font-medium text-gray-800">
                                                {item.title}
                                            </h3>
                                            </Link>
                                            <p className="text-xs text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        ₹{item.price * item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <p className="text-gray-600">Subtotal</p>
                                <p className="font-medium text-gray-800">₹{total}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-600">Delivery Charges</p>
                                <p className="font-medium text-gray-800">₹50</p>
                            </div>
                            <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                <p>Total Amount</p>
                                <p className="text-blue-600">₹{total + 50}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                        onClick={() => alert("Order placed successfully!")}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
