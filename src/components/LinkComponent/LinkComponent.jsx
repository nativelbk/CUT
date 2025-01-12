"use client";

import classNames from "classnames";
import Link from "next/link";

export default function LinkComponent({ active, text, link, second, icon }) {
  return (
    // <Link
    //   href={link}
    //   className={classNames(
    //     "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 w-[90%] cursor-pointer",
    //     {
    //       "bg-white text-blue shadow-md ": active,
    //       "bg-blue-500 text-white  hover:bg-red": !active,
    //     }
    //   )}
    // >
    //   {icon}
    //   <span className="text-sm font-medium">{text}</span>
    // </Link>
    <Link
      href={link}
      className={classNames(
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out w-[90%] cursor-pointer ", // Style de base
        {
          "bg-white text-blue shadow-md ring-2 ring-blue-500  hover:scale-105":
            active,
          "bg-blue-500 text-white hover:bg-indigo-300  hover:ring-2 hover:ring-blue-300":
            !active,
        }
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-semibold tracking-wide">{text}</span>
    </Link>
  );
}
