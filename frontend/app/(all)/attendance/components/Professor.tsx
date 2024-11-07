import axios from "axios";
import AttendanceUI from "./AttendanceUI";
import { getBaseURL } from "@/lib/utils";


export default async function Professor({ token }: { token: string }) {
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
