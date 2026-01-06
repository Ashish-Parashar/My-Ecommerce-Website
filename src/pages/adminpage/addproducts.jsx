import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";

function Addproducts() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState(""); // ✅ new state
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]); // ✅ new state
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [products, setproducts] = useState([]);
  const [showform, setshowform] = useState(false);
  const token = localStorage.getItem('token');

  const ProductsUrl = 'https://backend-jvcj.onrender.com/api/products';
  const categoryUrl = 'https://backend-jvcj.onrender.com/api/categories';

  const getCategory = async () => {
    try {
      const res = await fetch(categoryUrl);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(ProductsUrl);
      const result = await res.json();
      setproducts(result);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const submitProduct = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Login first!");
      return;
    }

    const formData = new FormData();
    formData.append("title", productName);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("about", about); // ✅ new field
    formData.append("price", price);
    formData.append("image", image);
    gallery.forEach((file) => formData.append("gallery", file)); // ✅ new field

    try {
      if (
        products.some(
          (p) =>
            p.title?.toLowerCase() === productName.toLowerCase() &&
            (p.category?._id === category || p.category === category)
        )
      ) {
        alert("A product with this name already exists in the same category!");
        return;
      } else {
        const res = await fetch(ProductsUrl, {
          method: 'post',
          body: formData,
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const result = await res.json();
        console.log(result);
        if (res.ok) {
          alert("Product added successfully!");
          setProductName("");
          setCategory("");
          setDescription("");
          setAbout(""); // ✅ reset about
          setPrice("");
          setImage(null);
          setGallery([]); // ✅ reset gallery
          setshowform(false);
        } else {
          alert(result.message || "Error adding product");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setshowform(true);
        }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold
                 px-3 py-1 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <FaPlus />
        Add Product
      </button>

      {showform && (
        <div className='w-[100%] h-[100vh] bg-[#000000be] absolute left-0 top-0  z-50 '>
          <div className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 sm:p-4 rounded-2xl shadow-lg w-full max-w-2xl space-y-6 border border-gray-1000">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Add Product Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  placeholder="Enter product description"
                  rows="1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                ></textarea>
              </div>

              <div className="w-full sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">About this item</label>
                <textarea
                  placeholder="Enter about this product"
                  rows="1"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                ></textarea>
              </div>

              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2">Product Image</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full text-gray-700 border-2 border-gray-300 rounded-lg cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <div className="w-full sm:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Gallery Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setGallery([...e.target.files])}
                  className="w-full text-gray-700 border-2 border-gray-300 rounded-lg cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => {
                  submitProduct();
                  setshowform(false);
                }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Submit Product
              </button>

              <button
                onClick={() => setshowform(false)}
                className="bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-300 hover:scale-105 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Addproducts;
