import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  // const { session, user } = await getCurrentSession();
  // console.log("hi");
  // let userData;
  // if (session) {
  //   userData = await getUserDetails(user!);
  // }
  //
  return (
    <main className="flex flex-col gap-8 min-h-screen items-center justify-center font-[family-name:var(--font-geist-sans)]">
      {/* {user && <div className="text-3xl">Welcome {userData.full_name}!</div>} */}
      {/* {session ? ( */}
      {/*   <Link href="/dashboard">Go to Dashboard</Link> */}
      {/* ) : ( */}
      {/*   <Link href="/login">Login</Link> */}
      {/* )} */}
    </main>
  );
}
