import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import Link from "next/link";
import { IoArrowForwardCircle } from "react-icons/io5";

export default async function Professor({ data }: any) {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  return (
    <div className="text-2xl">
      <h1 className="text-5xl mb-3">
        Welcome Professor {userData.full_name.split(" ")[1]}!
      </h1>
      <ul className="list-disc w-fix">
        <li className="w-fit">
          <Link href="/module/prof/create" className="text-blue-300">
            Create a module <IoArrowForwardCircle className="inline" />
          </Link>
        </li>
        <li className="w-fit">
          <Link href="/module/prof" className="text-blue-300">
            Manage modules <IoArrowForwardCircle className="inline" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
