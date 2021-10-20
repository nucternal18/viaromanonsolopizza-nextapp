/* eslint-disable react/display-name */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";

// context
import { useAuth } from "../../context/authContext";

// navlinks
const navLink = [
  {
    id: 1,
    link: "/",
    title: "HOME",
  },
  {
    id: 2,
    link: "/menu",
    title: "MENU",
  },
  {
    id: 3,
    link: "/galleria",
    title: "GALLERIA",
  },
  {
    id: 4,
    link: "/contatti",
    title: "CONTATTI",
  },
];

const MainNavbar = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [pos, setPos] = useState("top");
  const { state, logout } = useAuth();

  // mobile nav bar ref
  const mobileNavRef = useRef<HTMLElement>();
  // user drop down ref
  const ref = useRef<HTMLDivElement>();

  // Close user drop down list when user clicks outside event window
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!isDropDownOpen) return;
        toggleUserDropdown();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropDownOpen, ref]);

  // Close mobile nav drawer when user clicks outside event window
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!mobileNavRef.current?.contains(event.target)) {
        if (!isOpen) return;
        toggle();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, mobileNavRef]);

  // Check the top position of the navigation in the window
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      const scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 5) {
        setPos("moved");
      } else {
        setPos("top");
      }
    });
  }, []);

  // toggle the mobile navigation bar and the user dropdown list
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // logout handler
  const logoutHandler = () => {
    logout();
  };

  return (
    <nav
      className={` top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-2  ${
        router.asPath === "/" && pos === "top"
          ? "bg-transparent absolute"
          : pos === "top"
          ? "absolute bg-gray-100"
          : "fixed shadow-2xl bg-white"
      }  navbar-expand-lg`}
    >
      <div className="container flex items-center justify-between px-1 mx-auto max-w-screen-xl font-light text-gray-600 md:relative sm:px-1 md:px-0 md:flex-row">
        <Link href={"/"}>
          <a className="inline-block p-0 m-0 text-2xl font-bold cursor-pointer md:mr-4 ">
            <Image
              src={"/strisciaNoBG.jpg"}
              alt="blooms hair logo"
              height={60}
              width={250}
              layout="intrinsic"
              objectFit="contain"
            />
          </a>
        </Link>
        {/* Mobile Nav menu button */}
        <div className="flex items-center justify-center mb-2">
          <div className="flex items-center lg:hidden mx-2">
            {state.isAuthenticated && (
              <button
                className="flex items-center  bg-gray-200 border-2 border-yellow-500 rounded-full"
                disabled
              >
                <Image
                  src={state.userData.photoUrl}
                  alt={state.userData.displayName}
                  width={30}
                  height={30}
                  className="rounded-full"
                  objectFit="cover"
                />
              </button>
            )}
          </div>
          <button
            type="button"
            aria-expanded="false"
            aria-disabled={isOpen}
            disabled={isOpen}
            aria-label="Toggle navigation"
            className={`block float-right text-4xl ${
              pos === "top" ? "text-gray-200" : "text-gray-800"
            }  lg:hidden focus:outline-none focus:shadow-none`}
            onClick={toggle}
          >
            &#8801;
          </button>
        </div>
        {/* Main Nav links */}
        <ul className={position.right}>
          {navLink.map((link) => (
            <li key={link.id} className="flex px-1 m-0 list-none ">
              <Link href={link.link}>
                <a
                  className={`${
                    router.asPath === link.link
                      ? "text-red-500"
                      : "text-gray-400"
                  } flex items-center lg:block ml-0 mb-0 cursor-pointer py-1   hover:text-red-400 text-xs md:text-sm font-normal list-none uppercase`}
                >
                  {link.title}
                </a>
              </Link>
            </li>
          ))}
          {state.isAuthenticated && (
            <li className="px-1 m-0 text-base list-none">
              <button
                className="flex items-center bg-white border-2 border-red-500 rounded-full"
                onClick={toggleUserDropdown}
              >
                <Image
                  src={state.userData.photoUrl}
                  alt={state.userData.displayName}
                  width={30}
                  height={30}
                  className="rounded-full"
                  objectFit="cover"
                />
              </button>
              <div
                className={
                  isDropDownOpen
                    ? "absolute right-0 z-20 w-32 mt-2 overflow-hidden bg-gray-900 rounded-md shadow-xl"
                    : "hidden"
                }
                ref={ref}
              >
                <div>
                  <button className="flex items-center px-4 py-2 space-x-2">
                    <RiAdminFill className="text-gray-400 " />
                    <Link href={"/admin"}>
                      <a
                        className={`${
                          router.asPath === "/account/login"
                            ? "text-red-500"
                            : "text-gray-200"
                        } block text-lg font-medium  uppercase list-none cursor-pointer hover:text-yellow-400`}
                      >
                        admin
                      </a>
                    </Link>
                  </button>
                  <button
                    className="flex items-center px-4 py-2 space-x-2 text-lg text-gray-400 hover:text-yellow-500"
                    onClick={logoutHandler}
                  >
                    <FiLogOut className="text-gray-200 " />
                    <p>Logout </p>
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>

      <aside
        className={
          isOpen
            ? `${classNames.default} ${classNames.enabled}`
            : `${classNames.default} ${classNames.disabled}`
        }
        ref={mobileNavRef}
      >
        <div className="flex flex-col">
          <div className="flex items-center px-3 py-2 ml-4">
            <div className="mr-12">
              <button
                aria-label="Close"
                className=" py-1  text-4xl text-gray-900 cursor-pointer focus:outline-none"
                onClick={toggle}
              >
                &times;
              </button>
            </div>
          </div>
          <div className="mt-2">
            <ul className="overscroll-y-auto">
              {navLink.map((link) => (
                <li
                  key={link.id}
                  className="flex px-1 m-0 text-base list-none sm:text-xs md:text-sm text-md"
                >
                  <Link href={link.link}>
                    <a
                      className={`${
                        router.asPath === link.link
                          ? "text-red-500"
                          : "text-gray-200"
                      }flex items-center  ml-4 mb-2 cursor-pointer py-1.5  px-2   hover:text-red-500 text-lg font-medium list-none uppercase`}
                    >
                      {link.title}
                    </a>
                  </Link>
                </li>
              ))}
              {state.isAuthenticated ? (
                <>
                  <li className="px-1 m-0 text-base list-none text-md">
                    <button className="flex items-center py-1.5  px-2 mb-2 ml-4 space-x-2">
                      <RiAdminFill
                        className={`${
                          router.asPath === "/admin"
                            ? "text-red-500"
                            : "text-gray-900 hover:text-red-500"
                        }`}
                      />
                      <Link href={"/admin"}>
                        <a
                          className={`${
                            router.asPath === "/admin"
                              ? "text-red-500"
                              : "text-gray-900"
                          } block text-lg font-medium  uppercase list-none cursor-pointer hover:text-red-500`}
                        >
                          admin
                        </a>
                      </Link>
                    </button>
                  </li>

                  <li className="px-1 m-0 text-base list-none text-md">
                    <button
                      className="flex items-center  ml-4 mb-4 cursor-pointer py-1.5  px-2  space-x-2 text-gray-900 hover:text-red-500 text-lg font-medium list-none uppercase"
                      onClick={logoutHandler}
                    >
                      <FiLogOut className="text-gray-900 hover:text-red-500" />
                      <p>Logout </p>
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex items-center px-1 m-0 text-base list-none text-md">
                  <button className="flex items-center">
                    <FiLogIn className="ml-5 mr-1 text-gray-200 " />
                    <Link href={"/account/login"}>
                      <a
                        className={`${
                          router.asPath === "/auth/login"
                            ? "text-red-500"
                            : "text-gray-200"
                        }py-1 text-lg font-medium  uppercase list-none cursor-pointer hover:text-red-500`}
                      >
                        Sign In
                      </a>
                    </Link>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </nav>
  );
};

const position = {
  left: "hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0 md:items-center",
  right: "hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:items-center",
  center:
    "hidden  pl-0 mb-0 ml-auto lg:flex md:pl-0 md:mb-0 md:mx-auto md:items-center",
  default: "hidden  pl-0 mb-0 mr-auto lg:flex md:pl-0 md:mb-0 md:items-center",
};

const classNames = {
  default: `lg:hidden flex h-screen fixed top-0 right-0 transition-all ease duration-200`,
  enabled: `w-7/12 md:w-1/3 bg-gray-100 z-50  text-gray-900 overflow-y-hidden `,
  disabled: `w-0  bg-gray-800 text-white overflow-x-hidden`,
};

export default MainNavbar;
