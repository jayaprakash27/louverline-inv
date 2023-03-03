import React from "react";
import logo from './images/logo.png'

const Footer = () => {
  return (
    <div className="footer flex w-full p-3 bg-cust-khaki bottom-0">
      <div className="footer-logo m-6">
        <img src={logo} alt="" className=" h-20" />
      </div>
    </div>
  );
};

export default Footer;
