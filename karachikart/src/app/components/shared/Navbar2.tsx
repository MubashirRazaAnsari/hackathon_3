"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaHeart,
  FaSearch,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
} from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";


interface DropdownProps {
  items: { label: string; href: string }[];
  isMenuOpen: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ items, isMenuOpen }) => {
  if (!isMenuOpen) return null;

  return (
    <div className="absolute top-full left-0 bg-white border rounded-md py-2 min-w-[150px] z-50">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="block px-4 py-2 text-black hover:text-gray-500 hover:bg-gray-900 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};


const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownHover = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const dropdownMenus = {
  
    Brand_New: [
      { label: 'Funiture', href: '/category/funiture' },
      { label: 'Second-Hand', href: '/secondhand' },
      { label: 'Services', href: '/services' },
    ],
  };

  return (
    <div className="w-full mx-auto sticky top-0 z-50 bg-white shadow-md mb-6">
      <div className="w-[85vw] h-[80px] mx-auto flex justify-between items-center my-4">
        <div className="flex items-center gap-2">
          <Link href={'/'}>
          <h1 className="text-2xl font-bold">Karachi<span className="text-gray-500">KART</span></h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-base font-medium">
        <Link href="/" className="hover:text-gray-500">
            Home
        </Link>
        <div
            className="relative"
            onMouseEnter={() => handleDropdownHover('products')}
            onMouseLeave={handleDropdownLeave}
          >
            <button className='hover:text-gray-500 flex items-center'>
              Products <FaChevronDown className='ml-1 text-xs' />
            </button>
            <Dropdown items={dropdownMenus.Brand_New} isMenuOpen={activeDropdown === 'products'} />
          </div>
          <Link href="/about" className="hover:text-gray-500">
            About
          </Link>
          <Link href="/signup" className="hover:text-gray-500">
            FAQs
          </Link>
          {/* <Link href="/about" className="hover:text-gray-500">
            About
          </Link> */}
        </div>

        {/* Search and Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-full">
            <FaSearch className="text-sm font-light hover:text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              spellCheck="false"
              className="bg-gray-100 border-none outline-none w-[180px] lg:w-[200px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative">
              <FaShoppingBag className="text-sm hover:text-gray-500 w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href={'/wishlist'}>
            <FaHeart className="text-sm hover:text-gray-500 w-4 h-4" />
            </Link>
            <Link href={"/signup"}>
            <FaUser className="text-sm hover:text-gray-500 w-4 h-4" />

            </Link>
            <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? (
                <FaTimes className="text-sm text-gray-500" />
              ) : (
                <FaBars className="text-sm text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed right-0 top-[4.5rem] bg-white rounded-lg shadow-lg w-48 z-50">
          <div className="flex flex-col items-start gap-4 p-4 text-base">
            <Link href="/" className="hover:text-gray-500 w-full">
              Products
            </Link>
            <Link href="/about" className="hover:text-gray-500 w-full">
              Help
            </Link>
            <Link href="/signup" className="hover:text-gray-500 w-full">
              Sign-Up
            </Link>
            <Link href="/about" className="hover:text-gray-500 w-full">
              About
            </Link>
            <div className="flex flex-col items-start gap-4 text-sm mt-2 border-t w-full pt-4">
              <Link href="/" className="hover:text-red-500 w-full">
                Find a Store
              </Link>
              <Link href="/" className="hover:text-red-500 w-full">
                Help
              </Link>
              <Link href="/" className="hover:text-red-500 w-full">
                Join Us
              </Link>
              <Link href="/" className="hover:text-red-500 w-full">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar2;
