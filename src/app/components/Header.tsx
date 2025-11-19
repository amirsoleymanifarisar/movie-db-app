"use client";
import HeaderItem from "./HeaderItem";
import DarkModeSwitch from "./DarkModeSwitch";
import { HomeIcon, BoltIcon, UserIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  const menuItems = [
    { title: "HOME", Icon: HomeIcon, param: "trending" },
    { title: "TOP RATED", Icon: BoltIcon, param: "topRated", cName: "mt-1" },
  ]; // ⬅️ removed ACCOUNT from here

  return (
    <div className="flex justify-between items-center h-16 max-w-6xl mx-auto pt-5">
      {/* LEFT: MENU ITEMS */}
      <div className="flex gap-10 items-center">
        {menuItems.map((item) => (
          <HeaderItem
            key={item.param}
            title={item.title}
            Icon={item.Icon}
            param={item.param}
            cName={item.cName}
          />
        ))}
      </div>

      {/* RIGHT: SEARCH, LOGO, LOGIN/LOGOUT */}
      <div className="flex gap-4 items-center">
        {/* Dark mode */}
        <div className="flex flex-col items-center group cursor-pointer w-12 sm:w-20 hover:text-white">
          <DarkModeSwitch />
        </div>

        {/* Search bar */}
        <form action="/search">
          <input
            name="query"
            placeholder="Search..."
            className="px-3 py-1 w-32 sm:w-48 rounded-md text-black"
            autoComplete="off"
          />
        </form>

        {/* Logo */}
        <span className="text-2xl font-bold bg-amber-500 p-1 rounded-lg">
          IMDb
        </span>
        <span className="text-xl hidden sm:inline">Clone</span>

        {/* LOGIN / LOGOUT */}
        {session ? (
          <img
            src={session.user?.image || ""}
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon
            className="h-8 cursor-pointer hover:text-amber-500"
            onClick={() => signIn("google")}
          />
        )}
      </div>
    </div>
  );
}
