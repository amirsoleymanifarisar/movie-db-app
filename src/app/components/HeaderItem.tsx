// src/components/HeaderItem.tsx
import Link from "next/link";
import React from "react";

interface HeaderItemProps {
  title: string;
  Icon: React.ElementType;
  param: string;
}

export default function HeaderItem({ title, Icon, param }: HeaderItemProps) {
  return (
    <Link
      href={`/?genre=${param}`}
      className="flex flex-col items-center group cursor-pointer w-12 sm:w-20 hover:text-white"
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="opacity-0 group-hover:opacity-100 tracking-widest">
        {title}
      </p>
    </Link>
  );
}
