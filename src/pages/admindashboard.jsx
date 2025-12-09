import React, { useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import ProductCategory from './adminpage/productCategory';   
import ProductsList from './adminpage/ProductsList'; 


function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState('productslist'); 

    const menuItems = [
        { name: 'ProductsList', icon: <FaListUl  />, slug: 'productslist' },
        { name: 'ProductCategory', icon: <MdCategory  />, slug: 'productcategory' }
    ];

    const renderContent = () => {
        switch (activeMenu) {
            case 'productcategory':
                return <ProductCategory />;
            case 'productslist':
                return <ProductsList />;
            default:
                return;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 ">
            {/* Sidebar */}
            <div
                className={`bg-white shadow-md transition-all duration-300 ${
                    isSidebarOpen ? 'w-64' : 'w-16'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <span className={`text-xl font-bold ${!isSidebarOpen && 'hidden'}`}>
                        Admin
                    </span>
                    <button
                        className="p-1 focus:outline-none"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <IoIosArrowBack />: <IoIosArrowForward /> }
                    </button>
                </div>

                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <div
                            key={item.slug}
                            className={`flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-200 transition-colors ${
                                activeMenu === item.slug ? 'bg-gray-200 font-semibold' : ''
                            }`}
                            onClick={() => setActiveMenu(item.slug)}
                        >
                            <span className="text-gray-700">{item.icon}</span>
                            <span className={`${!isSidebarOpen && 'hidden'} text-gray-700`}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
                {renderContent()}</div>
        </div>
    );
}

export default AdminDashboard;
