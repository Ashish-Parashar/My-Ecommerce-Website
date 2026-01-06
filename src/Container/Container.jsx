import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/header";
import Userdashboard from "../pages/userdashboard";
import Signup from "../pages/signup";
import Login from "../pages/Login";
import Admindashboard from "../pages/admindashboard";
import Addproducts from "../pages/adminpage/addproducts";
import ProductCategory from "../pages/adminpage/productCategory";
import ProductsList from "../pages/adminpage/ProductsList";
import Addcategory from "../pages/adminpage/addcategory";
import SingleProduct from "../pages/userpages/singleProduct";
import CartPage from "../pages/userpages/cartPage";
import CheckoutPage from "../pages/userpages/CheckoutPage";

function Container() {
  const [role, setRole] = useState(() => {
    const storedData = localStorage.getItem("user");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    return parsedData?.user?.role || null;
  });


  console.log("Current role:", role);

  return (
    <>
      <Header setrole={setRole} />
      <Routes>
        <Route path="/" element={role ? <Userdashboard /> : <Login setrole={setRole} />} />
        <Route path="/products" element={<h1>Products</h1>} />
        <Route path="/addproducts" element={role === 'admin' ? <Addproducts /> : <Navigate to="/" replace />} />
        <Route path="/login" element={role ? <Navigate to="/" replace /> : <Login setrole={setRole} />} />
        <Route path="/signup" element={role ? <Navigate to="/" replace /> : <Signup setrole={setRole} />} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/admindhaboard" element={role === 'admin' ? <Admindashboard /> : <Navigate to="/" replace />} />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
        <Route path="/productcategory" element={role === 'admin' ? <ProductCategory /> : <Navigate to="/" replace />} />
        <Route path="/productslist" element={role === 'admin' ? <ProductsList /> : <Navigate to="/" replace />} />
        <Route path="/addcategory" element={role === 'admin' ? <Addcategory /> : <Navigate to="/" replace />} />
        <Route path="product/:id" element={ role ?   <SingleProduct /> : <Login setrole={setRole} />} />
        <Route path="cart" element={ role ? <CartPage /> : <Login setrole={setRole} />} />
        <Route path="checkout" element={ role ? <CheckoutPage /> : <Login setrole={setRole} />} />
      </Routes>
    </>
  );
}

export default Container;
