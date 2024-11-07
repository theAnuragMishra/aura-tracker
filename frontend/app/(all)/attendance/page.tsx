import jwt from "jsonwebtoken";
import { getUserDetails } from "@/lib/utils";
import { getCurrentSession } from "@/lib/auth";
import Student from "./components/Student";
import Professor from "./components/Professor";

export default async function Attendance() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });

  if (!["student", "professor"].includes(userData.role)) {
    return <div>You&apos;re not a student or a professor lol why try to access this page </div>
  }

  if (userData.role === "student") {
    return <Student token={token} />
  }

  if (userData.role === "professor") {
    return <Professor token={token} />
  }


}
