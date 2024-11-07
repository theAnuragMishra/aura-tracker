import { createSupabaseClient } from "../utils/supabase";
import jwt from "jsonwebtoken"

export async function getStudentCourses(req: any, res: any) {
  const user = req.user;
  const id = user.id;

  // console.log(user);

  const token = jwt.sign({ id }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase = createSupabaseClient(token);

  const { data, error } = await supabase.from("enrollment").select("course_id, courses!inner(course_name), profiles!inner(full_name)").eq("profiles.id", id);
  if (error) {
    console.log(error);
    return res.status(500).send({ message: "internal server error" })
  }
  return res.json(data);
}

export async function getStudentAttendance(req: any, res: any) {
  const user = req.user;
  const id = user.id;
  const course_id = req.query.course_id;

  // console.log(user);

  const token = jwt.sign({ id }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase = createSupabaseClient(token);

  const { data, error } = await supabase.from("attendance").select("date, status, enrollment!inner(course_id, student_id)").eq("enrollment.student_id", id).eq("enrollment.course_id", course_id);

  if (error) {
    console.log(error);
    return res.status(500).send({ message: "internal server error" })
  }

  return res.json(data);

}
