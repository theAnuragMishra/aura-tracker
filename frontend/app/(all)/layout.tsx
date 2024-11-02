import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SideBar from "@/components/navigation/SideBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideBar />
        </div>

        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </>
  );
}
