import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.linkedin.com/in/utkarshrastogi121",
    icon: <RiLinkedinFill className="w-4 h-5 group-hover:text-white" />,
  },
  {
    path: "https://www.instagram.com/utkarsh_rastogi.121/",
    icon: <AiOutlineInstagram className="w-4 h-5 group-hover:text-white" />,
  },
];

const mainLinks = [
  { path: "/home", display: "Home" },
  { path: "/services", display: "Services" },
  { path: "/find-a-doctor", display: "Find a Doctor" },
  { path: "/about-us", display: "About Us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-around gap-[40px] flex-wrap">

          {/* Logo & Info */}
          <div className="max-w-sm">
            <img src={logo} alt="Website Logo" />

            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              © {year} <br />
              Developed by <b>Utkarsh Rastogi</b> <br />
              All rights reserved.
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-[20px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {mainLinks.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
