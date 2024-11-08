import Link from "next/link";
import { IoArrowForwardCircle } from "react-icons/io5";

export default function Student() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-2">Do these: </h1>
      <Link href="/module/student" className="text-2xl">
        Solve modules, gain aura! <IoArrowForwardCircle className="inline" />
      </Link>
    </div>
  );
}
