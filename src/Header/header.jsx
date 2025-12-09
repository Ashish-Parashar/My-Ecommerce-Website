import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { totalAmount } from '../Feature/addtocart';
import { IoClose } from "react-icons/io5";




function Header({ setrole }) {
  const storedData = localStorage.getItem('user');
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const user = parsedData?.user?.role || null;
  const name = parsedData?.user?.name
  const ProfileLetter = name ? name.charAt(0).toUpperCase() : "";
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(false)
  const [showCart, setshowcart] = useState(false)
  const total = useSelector((state) => state.addtocart.totalAmount);
  const cartItems = useSelector((state) => state.addtocart.items);
  const quantity = cartItems.map((item) =>
    item.quantity
  )
  const totalQuantity = quantity.reduce((acc, curr) => acc + curr, 0)

  console.log(cartItems)

  const dispatch = useDispatch()

 useEffect(() => {
    dispatch(totalAmount());
  }, [cartItems, dispatch]);


  // useEffect(() => {
  //   Logout()
  // }, [])

  const Logout = () => {
    localStorage.clear()
    navigate('/login')
    setrole(null)
  }

  return (
    <>
      <header className="  w-full bg-gradient-to-r  shadow-sm flex justify-center z-50 ">
        <div className=" w-[1340px] px-2 py-4 flex justify-between items-center ">
          <h1 className="text-black text-2xl font-bold tracking-wide">
            My<span className="text-yellow-300">Store</span>
          </h1>
          <div className=" gap-8 hidden md:flex  ">

            {user ? <Link
              to="/"
              className="text-black text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
            >
              Home
            </Link> : ''
            }
            {user === 'admin' ?
              <Link
                to="/admindhaboard"
                className="text-black text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
              >
                Dashboard
              </Link> : ''
            }
            {user ? '' :
              <Link
                to="/login"
                className="text-black text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
              >
                Login
              </Link>
            }

            {user ? <Link
              to="/login"
              onClick={Logout}
              className="text-black text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
            >
              Logout
            </Link> :
              <Link
                to="/signup"
                className="text-black text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
              >
                Signup
              </Link>
            }
            {/* {name &&
              <div className='w-6 h-6 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full'>
                <Link to='/profile'> {ProfileLetter}
                </Link>
              </div>
            }  */}
            <Link
              onClick={() => {
                setshowcart(true)
              }}
              className="relative flex flex-col items-center justify-center text-black transition-colors duration-300"
            >
              {/* Cart Icon (optional) */}
              <div className="relative">
                <FaCartArrowDown
                  className='text-[32px]'
                />
                {/* Quantity Badge */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              </div>

              {/* Total */}
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">
                ₹{total}
              </p>
            </Link>
          </div>
          <div className='block md:hidden absolute top-0 transition-all duration-1000 ease-in-out  w-[100%] h-[300px] bg-black'
            style={{ left: showMenu ? '0' : '-100%' }}
          >
            <div className="flex flex-col mt-6 ml-4 gap-4 ">

              {user ? <Link
                to="/"
                className="text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
                onClick={() => {
                  setshowMenu(false)
                }}
              >
                Home
              </Link> : ''
              }
              {user === 'admin' ?
                <Link
                  to="/AddProducts"
                  className="text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
                  onClick={() => {
                    setshowMenu(false)
                  }}
                >
                  Add Products
                </Link> : ''
              }
              {user ? '' :
                <Link
                  to="/login"
                  className="text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
                  onClick={() => {
                    setshowMenu(false)
                  }}
                >
                  Login
                </Link>
              }

              {user ? <Link
                to="/signup"
                onClick={() => {
                  Logout
                  setshowMenu(false)
                }}
                className="text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
              >
                Logout
              </Link> :
                <Link
                  to="/signup"
                  className="text-white text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
                  onClick={() => {
                    setshowMenu(false)
                  }}
                >
                  Signup
                </Link>
              }
              {name &&
                <div className='w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full'>
                  <Link to='/profile'> {ProfileLetter}
                  </Link>
                </div>
              }

            </div>

          </div>
          <Link
            onClick={() => {
              setshowcart(true)
            }}
            className="  md:hidden relative flex flex-col items-center justify-center text-black transition-colors duration-300"
          >
            <div className="relative">
              <FaCartArrowDown
                className='text-[32px]'
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">
              ₹{total}
            </p>
          </Link>
          {!showMenu ?
            < FiMenu className='block md:hidden font-bold text-[28px]'
              onClick={() => {
                setshowMenu(true)
              }}
            />
            : <RiCloseLargeLine className='text-white z-10 block md:hidden font-[900] text-[24px]'
              onClick={() => {
                setshowMenu(false)
              }}
            />
          }

          <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 p-4 transition-transform duration-500 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className='w-[100%] text-start p-2'>
              <IoClose
                onClick={() => {
                  setshowcart(false)
                }}
                className='text-[24px]' />
            </div>
            <div className="space-y-3 overflow-y-auto flex-1">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border border-gray-200 rounded-md p-2 hover:shadow-sm transition"
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
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.title.split(" ").slice(0, 2)}
                      </h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-3">
              <div className="flex justify-between text-base font-semibold text-gray-800 mb-3">
                <span>Total:</span>
                <span className="text-blue-600">₹{total}</span>
              </div>
              <Link to='/cart'>
              <button 
              onClick={()=>{
                setshowcart(false)
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
                See All
              </button>
              </Link>
            </div>

          </div>

        </div>
      </header>

    </>
  )
}

export default Header
