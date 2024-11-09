"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { MdDashboard, MdLeaderboard } from "react-icons/md";
import { IoChatbubblesSharp, IoPersonCircle } from "react-icons/io5";
import { FaBook, FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import { GoGoal } from "react-icons/go";

export default function NavLinks({ role }: { role: string }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard, include: true },
    {
      name: "Chat",
      href: "/chat",
      icon: IoChatbubblesSharp,
      include: role === "student" || role === "professor",
    },
    { name: "Courses", href: "/courses", icon: FaBook, include: true },
    {
      name: "Attendance",
      href: "/attendance",
      icon: FaCalendarCheck,
      include: role === "student" || role === "professor",
    },
    { name: "Profile", href: "/profile", icon: IoPersonCircle, include: true },
    {
      name: "Calendar",
      href: "/calendar",
      icon: FaCalendarAlt,
      include: role === "student" || role === "professor",
    },
    {
      name: "Goals",
      href: "/goals",
      icon: GoGoal,
      include: role === "student" || role === "professor",
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: MdLeaderboard,
      include: role === "student" || role === "professor",
    },
  ].filter((item) => item.include);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-1 text-md font-medium hover:bg-blue-300 hover:dark:bg-gray-700 hover:dark:text-white hover:text-black md:flex-none md:p-2 md:px-3 bg-blue-100 dark:bg-gray-900",
              {
                "bg-blue-300 dark:bg-gray-700 dark:text-white text-black":
                  pathname === link.href, //highlihting current route
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
