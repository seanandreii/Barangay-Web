import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline"; // Import a down arrow icon
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/sanjuan-logo.png";
import { auth } from "../firebase"; // Firebase auth import
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Links = [
    { name: "HOME", link: "/" },
    ...(isAuthenticated
      ? [
          {
            name: "SERVICES",
            link: "/services",
            dropdown: [
              { name: "Documents Request", link: "/service1" },
              { name: "Barangay Indigency", link: "/indigency" },
              { name: "Barangay Clearance", link: "/clearance" },
            ],
          },
          { name: "ANNOUNCEMENTS", link: "/announcement" },
        ]
      : []),
    { name: "ABOUT", link: "/about" },
  ];

  const [open, setOpen] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  const location = useLocation();
  const hiddenPaths = ["/admin", "/dashboard"];
  const hideNavbar = hiddenPaths.includes(location.pathname);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  if (hideNavbar) return null;

  return (
    <div className="shadow-md w-full fixed top-0 bg-white z-10">
      <div className="md:flex items-center justify-between bg-blue-500 py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1 text-white">
          <img
            className="size-10 drop-shadow-md hover:drop-shadow-xl"
            src={logo}
            alt="San Juan"
          />
          <span>SAN ONE</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7 text-white"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-blue-500 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link, index) => (
            <li
              key={index}
              className="md:ml-8 md:my-0 my-7 font-semibold relative"
            >
              {link.dropdown ? (
                <>
                  <div
                    className="flex items-center text-white hover:text-blue-400 cursor-pointer"
                    onClick={() =>
                      setShowServicesDropdown(!showServicesDropdown)
                    }
                  >
                    {link.name}
                    <ChevronDownIcon
                      className={`w-5 h-5 ml-1 transform transition-transform duration-200 ${
                        showServicesDropdown ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>

                  {showServicesDropdown && (
                    <ul className="absolute bg-white shadow-lg rounded-lg py-2 mt-2 w-48">
                      {link.dropdown.map((sublink, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 hover:bg-blue-100"
                        >
                          <Link
                            to={sublink.link}
                            className="text-gray-800 hover:text-blue-500"
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={link.link}
                  className="text-white hover:text-blue-400 duration-500"
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}

          {isAuthenticated ? (
            <button
              onClick={() => auth.signOut()}
              className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mx-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:white dark:focus:whitefont-medium rounded-lg text-sm px-5 py-2.5 mx-4"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
