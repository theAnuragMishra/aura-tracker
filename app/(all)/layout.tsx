import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  );
}
