import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import Student from "./components/Student";
import Professor from "./components/Professor";
import Rewarder from "./components/Rewarder";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  if (!userData.role) {
    redirect("/profile?highlightRole=true");
  }

  return (
    <div>
      {userData.role === "student" ? (
        <Student data={userData} />
      ) : userData.role === "professor" ? (
        <Professor data={userData} />
      ) : (
        <Rewarder data={userData} />
      )}
    </div>
  );
}
