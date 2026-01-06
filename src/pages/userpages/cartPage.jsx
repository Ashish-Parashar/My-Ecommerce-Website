import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { totalAmount, increaseQuantity, decreaseQuantity } from '../../Feature/addtocart';

function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.addtocart.items);
  const total = useSelector((state) => state.addtocart.totalAmount);


  useEffect(() => {
    dispatch(totalAmount());
  }, [cartItems, dispatch]);


  function handleIncrease(product) {
    dispatch(increaseQuantity(product))
  }
  function handleDecrease(product) {
    dispatch(decreaseQuantity(product))
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
        <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-5 sm:p-8'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            🛒 Your Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
          </h2>

          {/* Headings */}
          <div className="hidden sm:grid sm:grid-cols-4 text-gray-600 font-semibold border-b pb-2 mb-3 text-sm sm:text-base">
            <p className="text-left">Item</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-right">Total</p>
          </div>

          {/* Cart Items */}
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-md p-3 sm:p-4 hover:shadow-sm transition"
              >
                <div className="flex flex-col sm:hidden gap-3">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={`https://backend-jvcj.onrender.com${item.image}`}
                          alt={item.title}
                          className="w-[80px] h-[80px] object-contain rounded-md border border-gray-200 flex-shrink-0"
                        />
                      </Link>
                      <Link to={`/product/${item._id}`}>
                        <h3 className="text-sm font-medium text-gray-800 w-[150px] line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">₹{item.price}</p>
                  </div>


                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item._id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="px-2 text-sm font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-blue-600">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:grid sm:grid-cols-4 items-center gap-5">
                  <div className="flex  gap-2">
                    <Link to={`/product/${item._id}`} >
                      <img
                        src={`https://backend-jvcj.onrender.com${item.image}`}
                        alt={item.title}
                        className="w-[100px] h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
                      />
                    </Link>
                    <Link to={`/product/${item._id}`} >
                      <h3 className="text-base text-[14px] w-[150px] line-clamp-2 font-medium text-gray-800">{item.title}</h3>
                    </Link>
                  </div>

                  <p className="text-base text-gray-600 text-center">₹{item.price}</p>

                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
                    >
                      −
                    </button>
                    <span className="px-2 text-base font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-base font-semibold text-blue-600 text-right">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>


          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              Total Amount:
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-green-600 mt-2 sm:mt-0">
              ₹{total}
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to='/checkout'>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg shadow transition-all duration-300">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>


    </>
  );
}

export default CartPage;
