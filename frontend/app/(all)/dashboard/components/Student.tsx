import Link from "next/link";
import { FaCalendar, FaFireAlt } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { IoArrowForwardCircle } from "react-icons/io5";

export default function Student({ data }: any) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex text-4xl gap-2">
        {data.aura} Aura <FaFireAlt className="text-yellow-400" />
      </div>
      <div>
        <p className="text-3xl mb-2 ">Do these: </p>
        <Link href="/module/student" className="text-2xl">
          Solve modules, gain aura! <IoArrowForwardCircle className="inline" />
        </Link>
      </div>
      <div className="flex text-3xl gap-5 mt-5s">
        <Link
          href="/calendar"
          className="h-[100px] border-2 border-white rounded-md flex justify-center items-center gap-2 px-4 py-2"
        >
          <FaCalendar />
          Check your calendar!
        </Link>
        <Link
          href="/goals"
          className="h-[100px] border-2 border-white rounded-md flex justify-center items-center gap-2 px-4 py-2"
        >
          <GoGoal />
          Shoot your goals!
        </Link>
      </div>
    </div>
  );
}
