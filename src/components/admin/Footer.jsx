import React from "react";
import { FaFacebook,FaTwitter,FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <div className="flex items-center gap-4">
      <h2  className='my-font font-semibold tracking-wider'>SHOP<span className='text-green-700'>NEST</span></h2>
      <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Shopnest. All Rights Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#">
        <FaFacebook/>
        </a>
        <a href="#">
        <FaTwitter/>
        </a>
        <a href="#">
         <FaInstagram/>
          </a>
      </div>
    </div>
  );
};

export default Footer;