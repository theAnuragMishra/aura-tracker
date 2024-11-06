import { getCurrentSession } from "@/lib/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import AttendanceUI from "./components/AttendanceUI";
import { getBaseURL, getUserDetails } from "@/lib/utils";
import Student from "./components/Student";

export default async function Attendance() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  if (!["student", "professor"].includes(userData.role)) {
    return <div>You&apos;re not a student or a professor lol why try to access this page </div>
  }

  if (userData.role === "student") {
    return <Student />
  }

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });
  let data;
  try {
    const response = await axios.get(
      `${getBaseURL()}/api/prof/attendance/dates`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    data = response.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="mb-5 text-6xl">Attendance</div>
      <AttendanceUI dates={data} />
    </div>
  );
}
