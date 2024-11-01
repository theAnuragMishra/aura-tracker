import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getCurrentSession();
  if (session) {
    redirect("/");
  }
  return <div>{children}</div>;
}
