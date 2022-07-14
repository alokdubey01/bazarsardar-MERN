import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { signout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import brand from "../../static/img/image.svg";

const navigation = {
  pages: [
    { name: "Order Medicine", to: "/medicine" },
    { name: "Consult Doctor", to: "#" },
    { name: "Diagnostic Test", to: "#" },
    { name: "Orders", to: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.to}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <a
                      href="/"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="/"
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Bazarsardar-Health</span>
                  <img className="h-8 w-auto" src={brand} alt="bazarsardar" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.to}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {userInfo ? (
                    <div class="flex justify-center">
                      <div>
                        <div class="dropdown relative">
                          <Link
                            class="dropdown-toggle px-6 py-2.5 font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                            to="#"
                            type="button"
                            id="dropdownMenuButton2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {userInfo.name}
                          </Link>
                          <ul
                            class="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                            aria-labelledby="dropdownMenuButton2"
                          >
                            <li>
                              <Link
                                class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                to="/profile"
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                to="/orderhistory"
                              >
                                Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                to="#signout"
                                onClick={signoutHandler}
                              >
                                Sign Out
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to="/signin"
                      class="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                  )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="/" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                     {cartItems.length > 0 && (
                       <span class="ml-1 bg-red-600 text-white text-xs rounded-full px-1 mt-1 font-medium group-hover:text-gray-800">
                         {cartItems.length}
                       </span>
                     )}
                    {/* <span className="sr-only">items in cart, view bag</span> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
