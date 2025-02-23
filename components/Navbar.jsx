"use client";

import Image from "next/image";
import { NavbarLinks } from "../lib/data";
import Link from "next/link";
import logout from "../lib/functions/logout";

const Navbar = ({ user = undefined, fixed = false }) => {
  const notifications = 0;

  return (
    <div
      className={`flex h-16 w-screen items-center justify-between border-b border-[#2a2a2a] bg-[#1E1E1E] px-[60px] ${fixed ? "fixed" : ""}`}
    >
      <div className="flex items-center gap-8">
        <Link href={"/dashboard"}>
          <Image
            src="/logo.png"
            alt="logo"
            height={50}
            width={50}
            className="mr-1.5 h-12 w-auto"
          />
        </Link>
        {NavbarLinks.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="transition-colors hover:text-color-main-light"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-[320px] rounded-lg bg-[#2a2a2a] px-4 text-[15px] text-white outline-none"
          />
          <Image
            src="/search.svg"
            alt="search"
            width={20}
            height={20}
            className="absolute right-3 h-5 w-5 invert"
          />
        </div>
        <button className="relative">
          <Image
            src="/bell.svg"
            alt="notifications"
            width={24}
            height={24}
            className="h-6 w-6 invert"
          />
          {notifications > 0 && (
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-600"></span>
          )}
        </button>
        {user ? (
          <div onClick={logout} className="cursor-pointer">
            <Image
              src="/profile.jpg"
              alt="profile image"
              width={100}
              height={100}
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>
        ) : (
          <Link
            className="flex h-10 items-center gap-2 rounded bg-color-main px-5 text-[13px] font-medium"
            href="/signup"
          >
            Get Started
            <div className="invert filter">
              <Image
                src="/arrow-right.svg"
                alt="arrow right"
                width={20}
                height={25}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
