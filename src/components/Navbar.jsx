import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin,credit,logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6 py-4 ">
      <div className="flex items-center gap-2 cursor-pointer">
        <Link to={"/"} />
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="w-28 sm:w-32 lg:w-40"
        />
      </div>
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/buycredit")}
              className="flex item-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left: <span className="font-bold">{credit}</span>
              </p>
            </button>
            <p className="text-gray-700 max-sm:hidden pl-4">{`Hi, ${user.userName}`}</p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-10 h-10 drop-shadow"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li onClick={logout}
                    className="py-1 px-2 cursor-pointer pr-10"
                    
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/buycredit")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Pricing
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-900 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
