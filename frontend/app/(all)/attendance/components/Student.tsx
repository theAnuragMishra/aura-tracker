import { getBaseURL } from "@/lib/utils"
import axios from "axios"
import SelectSubject from "./SubjectSelect";

export default async function Student({ token }: { token: string }) {
  let data: { course_id: number, courses: { course_name: string }, profiles: { full_name: string } }[] | null = null;
  try {
    const response = await axios.get(`${getBaseURL()}/api/student/courses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    data = response.data;

    // console.log(response.data);
  }
  catch (error) {
    console.error(error);
  }

  return <div>
    <h1 className="text-5xl mb-3">Attendance</h1>
    {data ? <SelectSubject data={data} /> : "Error fetching subjects"}

  </div>
}
