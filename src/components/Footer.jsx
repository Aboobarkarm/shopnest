import React from 'react'

const Footer = () => {
  
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start bg-[#d8f5d0] mt-5 justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <div className=" w-full md:w-full flex items-center">
            <h2
              className="my-font cursor-pointer text-center font-semibold tracking-wider"
            >
              SHOP<span className="text-green-700">NEST</span>
            </h2>
          </div>
          <p className="mt-6 text-sm hidden md:flex">
            Shopnest is your modern online store offering a seamless shopping experience across Nigeria.
            We provide a wide selection of products from fashion to electronics designed to meet your everyday needs.
            Enjoy competitive pricing, fast delivery, secure payment, and top-tier customer service.
            At Shopnest, we make shopping easy, enjoyable, and affordable for everyone.
          </p>
        </div>

        <div className="w-1/2 items-center justify-start md:justify-center hidden mf:flex">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+234 8140480040</p>
              <p>support@shopnest.com.ng</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        &copy; {new Date().getFullYear()} Shopnest. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;