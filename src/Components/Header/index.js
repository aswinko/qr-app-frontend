import React from "react";
import { Button, Navbar } from "flowbite-react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar fluid={true} rounded={false} className="shadow-xl dark:bg-transparent">
      <Navbar.Brand to="/navbars">
        {/* <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        /> */}
        <span className="self-center whitespace-nowrap text-xl py-4 pl-24 font-semibold dark:text-gray-800">
          Food App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavLink
          className="text-gray-800 hover:text-gray-600"
          to="/"
        >
          Home
        </NavLink>
        <NavLink className="text-gray-800 hover:text-gray-600" to="/about">
          About
        </NavLink>
        <NavLink className="text-gray-800 hover:text-gray-600" to="/service">
          Services
        </NavLink>
        <NavLink className="text-gray-800 hover:text-gray-600" to="/pricing">
          Pricing
        </NavLink>
        <NavLink className="text-gray-800 hover:text-gray-600" to="/contact">
          Contact
        </NavLink>
        <NavLink className="text-gray-800 hover:text-gray-600 pr-24" to="/cart">
          <HiOutlineShoppingCart className="text-gray-800 text-2xl" />
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
