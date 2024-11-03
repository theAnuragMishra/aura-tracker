import { getCurrentSession } from "@/lib/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import AttendanceUI from "./components/AttendanceUI";

export default async function Attendance() {
  const { user } = await getCurrentSession();
  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });
  let data;
  try {
    const response = await axios.get(
      "http://localhost:5173/api/prof/attendance/dates",
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
