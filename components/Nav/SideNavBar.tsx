import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaNewspaper, FaShoppingBasket } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { MdRestaurantMenu, MdLibraryAdd } from "react-icons/md";
import { GrGallery } from "react-icons/gr";

// components
import ActiveLink from "./ActiveLink";

// redux
import { useAppDispatch } from "@app/hooks";
import { userApiSlice } from "@app/apiSlice";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [collapseShow, setCollapseShow] = useState("hidden");

  const handleLogout = () => {
    signOut();
    dispatch(userApiSlice.util.resetApiState());
    router.push("/");
  };

  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white text-gray-900 dark:text-gray-200 dark:bg-gray-900 shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap">
          {/* Toggler */}
          <button
            className="px-3 py-1 text-xl leading-none  bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FaBars />
          </button>
          {/* Brand */}
          <Link href="/">
            <a href="#pablo" className="inline-block whitespace-no-wrap py-2">
              <Image
                src={"/strisciaNoBG.jpg"}
                alt="via roma non solo pizza logo"
                width={230}
                height={35}
                quality={75}
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
              "md:flex md:flex-col md:items-stretch md:opacity-100    md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
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
                      className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left  uppercase whitespace-no-wrap md:block md:pb-2"
                    >
                      <Image
                        src={"/strisciaNoBG.jpg"}
                        alt="via roma non solo pizza logo"
                        width={200}
                        height={35}
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none  bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaTimes fontSize={21} />
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
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug  placeholder-gray-400 bg-gray-200 border border-gray-600 border-solid rounded shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Navigation */}

            <div className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4  ">
              <div className="items-center justify-center">
                <ActiveLink href="/admin">
                  <FaNewspaper fontSize={18} />
                  <span>Admin Home</span>
                </ActiveLink>
              </div>
              <hr className="my-4 md:min-w-full" />
              <div className="items-center">
                <ActiveLink href="/admin/menu">
                  <MdRestaurantMenu fontSize={18} />
                  <span>Gestisci menu</span>
                </ActiveLink>
                <ActiveLink href="/admin/menu/addMenuItem">
                  <MdLibraryAdd fontSize={18} />
                  <span>Aggiungi Menu</span>
                </ActiveLink>
              </div>
              <hr className="my-4 md:min-w-full" />
              <div className="items-center">
                <ActiveLink href="/admin/gallery">
                  <GrGallery fontSize={18} className="dark:text-gray-200" />
                  <span>Gestisci immagini</span>
                </ActiveLink>
                <ActiveLink href="/admin/gallery/addGalleryItem">
                  <MdLibraryAdd fontSize={18} />
                  <span>Aggiungi immagine</span>
                </ActiveLink>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            <div className="flex flex-col list-none md:flex-col md:min-w-divl md:mb-4">
              <div className="items-center">
                <button type="button" className="" onClick={handleLogout}>
                  <p className="flex flex-row py-3 text-xs font-bold  uppercase ">
                    <FiLogOut className="mr-2 text-sm" /> Logout
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
