import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const { session, user } = await getCurrentSession();

  let userData;
  if (session) {
    userData = await getUserDetails(user!);
  }

  return (
    <main className="flex flex-col gap-8 min-h-screen items-center justify-center font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 p-8 bg-cover bg-no-repeat" style={{ backgroundImage: 'url("https://wallpaper.dog/large/10859846.jpg")' }}>
      <div className="text-white text-4xl font-bold mb-4">
        {user && <div>Welcome {userData.full_name}!</div>}
      </div>
      {session ? (
        <Link
          href="/dashboard"
          className="px-6 py-3  text-white  shadow-lg "
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="px-7 py-4 bg-gradient-to-r from-purple-950 to-purple-700 text-white text-xl rounded-md shadow-lg hover:scale-105 transition-all ease-in-out"
        >
          Login
        </Link>
      )}
    </main>
  );
}
