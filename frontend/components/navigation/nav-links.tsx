"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { MdDashboard } from "react-icons/md";
import { IoChatbubblesSharp, IoPersonCircle } from "react-icons/io5";

export default function NavLinks(props: {
  userData: {
    id: number;
    created_at: Date;
    username: string;
    full_name: string;
    avatar_url: string;
    role: string;
  };
}) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: MdDashboard },

    { name: "Chat", href: "/chat", icon: IoChatbubblesSharp },
    { name: "Course", href: "/course", icon: IoChatbubblesSharp },
    {
      name: "Course Material",
      href: "/course_material",
      icon: IoChatbubblesSharp,
    },
    { name: "Courses", href: "/courses", icon: IoChatbubblesSharp },
    { name: "Profile", href: props.userData.username, icon: IoPersonCircle },
  ];

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
