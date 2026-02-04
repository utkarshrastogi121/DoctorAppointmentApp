import { useEffect, useRef, useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import { authContext } from "../../context/AuthContext";
import defaultPhoto from "../../assets/images/default.jpeg"
const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="header flex items-center relative z-50">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home">
            <img src={logo} alt="Website Logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="menu flex items-center gap-[2.5rem]">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] font-[600]"
                        : "text-textColor text-[16px] font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <Link
                to={
                  role === "doctor"
                    ? "/doctors/profile/me"
                    : "/users/profile/me"
                }
              >
                <figure className="w-[36px] h-[36px] rounded-full cursor-pointer">
                  <img
                    src={user.photo || defaultPhoto}
                    alt="User Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </figure>
              </Link>
            ) : (
              <Link to="/login">
                <button
                  className="bg-primaryColor text-white font-[600]
                             h-[36px] px-5
                             rounded-md
                             flex items-center justify-center
                             hover:bg-opacity-90 transition"
                >
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <span
              className="md:hidden flex items-center"
              onClick={() => setMenuOpen(true)}
            >
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <IoMdClose
            className="w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Menu links */}
        <ul className="flex flex-col gap-4 px-6 mt-6">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primaryColor text-[16px] font-[600]"
                    : "text-textColor text-[16px] font-[500] hover:text-primaryColor"
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
