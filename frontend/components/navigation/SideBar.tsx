"use client"; // Add this line

import Link from "next/link";
import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import NavLinks from "./nav-links";
import { handleLogout } from "@/lib/actions";

export default async function SideBar() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  const [ad, setAd] = useState<{ imageUrl: string; altText?: string } | null>(
    null
  );

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/ads/ad");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.imageUrl) {
          setAd(data);
        } else {
          console.error("Received invalid data", data);
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    fetchAd();
  }, []);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-5 flex h-20 items-center justify-center rounded-md p-4 md:h-30"
        href="/"
      >
        {/* <div className="w-32 text-black dark:text-white md:w-60 text-[32px]">
          <Image
            src="/"
            alt="mnnit-buzz logo"
            width={395}
            height={156}
            priority={true}
          />
        </div> */}
      </Link>

      {/* Ad Image */}
      {ad && ad.imageUrl && (
        <div className="flex justify-center mb-5">
          <img
            src={ad.imageUrl}
            alt={ad.altText || "Advertisement"}
            className="rounded-md shadow-md max-w-full h-auto"
          />
        </div>
      )}

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks role={userData.role} />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <button
          onClick={handleLogout}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-md font-medium hover:bg-blue-300 hover:dark:bg-gray-700 hover:dark:text-white hover:text-black bg-blue-100 dark:bg-gray-900 md:flex-none md:p-2 md:px-3"
        >
          <FaSignOutAlt className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
