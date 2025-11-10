import HeaderItem from "./HeaderItem";
import { HomeIcon, BoltIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const menuItems = [
    { title: "HOME", Icon: HomeIcon, param: "trending" },
    { title: "TOP RATED", Icon: BoltIcon, param: "topRated" },
    { title: "ACCOUNT", Icon: UserIcon, param: "user" },
  ];

  return (
    <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
      {/* 1. Menu Items Container*/}
      <div className="flex gap-10">
        {menuItems.map(
          (
            item //loop through menu items array
          ) => (
            <HeaderItem
              key={item.param}
              title={item.title}
              Icon={item.Icon}
              param={item.param}
            />
          )
        )}
      </div>
      {/* 2. Logo/Branding */}
      <div className="flex gap-4 items-center">
        <span className="text-2xl font-bold bg-amber-500 p-1 rounded-lg">
          IMDB
        </span>
        <span className="text-xl hidden sm:inline">Clone</span>
      </div>
    </div>
  );
}
