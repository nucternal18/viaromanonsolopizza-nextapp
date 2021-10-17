import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaTimes,
  FaNewspaper,
  FaUserCircle,
  FaImages,
  FaShoppingBasket,
  FaShippingFast,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";
import ActiveLink from "./ActiveLink";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const router = useRouter();
  const [collapseShow, setCollapseShow] = useState("hidden");
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-gray-800 shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap">
          {/* Toggler */}
          <button
            className="px-3 py-1 text-xl leading-none text-gray-200 bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FaBars />
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="inline-block p-2 px-0 mr-0 text-sm font-bold text-left text-gray-200 uppercase whitespace-no-wrap md:block md:pb-2"
            >
              <Image
                src={"/logo.svg"}
                alt="blooms hair logo"
                width={200}
                height={100}
              />
            </a>
          </Link>
          {/* User */}
          <ul className="flex flex-wrap items-center list-none md:hidden">
            {/* <li className='relative inline-block'>
                <NotificationDropdown />
              </li>
              <li className='relative inline-block'>
                <UserDropdown />
              </li> */}
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 bg-gray-800  md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="block pb-4 mb-4 border-b border-gray-300 border-solid md:min-w-full md:hidden">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-gray-200 uppercase whitespace-no-wrap md:block md:pb-2"
                    >
                      <Image
                        src={"/strisciaNoBG.jpg"}
                        alt="via roma non solo pizza logo"
                        width={200}
                        height={100}
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-gray-200 bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaTimes className="text-gray-200" />
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="pt-0 mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug text-gray-200 placeholder-gray-400 bg-gray-200 border border-gray-600 border-solid rounded shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4 ">
              <li className="items-center justify-center">
                <ActiveLink href="/admin">
                  <FaNewspaper className="mr-2 text-sm" />
                  Admin Home
                </ActiveLink>
              </li>

              <li className="items-center">
                <ActiveLink href="/admin/menu">
                  <FaShoppingBasket className="mr-2 text-sm" />
                  Manage Menu
                </ActiveLink>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="items-center">
                <button type="button" className="" onClick={handleLogout}>
                  <p className="flex flex-row py-3 text-xs font-bold text-gray-200 uppercase hover:text-gray-400">
                    <FiLogOut className="mr-2 text-sm" /> Logout
                  </p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
