import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import { getBaseURL } from "@/lib/utils";
import axios from "axios";
import jwt from "jsonwebtoken";
import SelectSubject from "./components/SelectSubject";

export default async function Module() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  if (userData.role !== "student") {
    return <div>Access denied</div>;
  }
  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });
  let data:
    | {
        course_id: number;
        courses: { course_name: string };
        profiles: { full_name: string };
      }[]
    | null = null;
  try {
    const response = await axios.get(`${getBaseURL()}/api/student/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = response.data;

    // console.log(response.data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <h1>Solve questions, earn Aura!</h1>
      {data ? <SelectSubject data={data} /> : "Error fetching subject"}
    </div>
  );
}
