import { Fragment, useRef, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { Link, Outlet } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/home", current: true },
  { name: "About Us", href: "/about", current: false },
  { name: "Services", href: "/service", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Root() {
  return (
    <>
      <div className="h-16 bg-white shadow-md flex items-center px-20">
        <div className="relative">
          {navigation.map((item) => {
            return (
              <Link
                to={item.href}
                className={classNames(
                  item.current
                    ? "text-cyan-300 font-medium p-3"
                    : "text-black hover:text-cyan-300 font-medium p-3"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="ml-auto order-2 flex items-center">
          <div className="bg-cyan-400 rounded-3xl m-3 p-2 px-4 text-white">
            +012 345 6789
          </div>
          <div className="bg-red-500 rounded-3xl border-2 border-red-500 m-3 p-2 px-5 hover:border-2 hover:border-red-500 hover:bg-white hover:text-red-500 text-white">
            <a href="">Make an appointment</a>
          </div>
          <div className="text-black hover:text-cyan-300 font-medium p-3">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
