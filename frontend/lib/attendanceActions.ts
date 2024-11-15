"use server";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getCurrentSession } from "./auth";
import { revalidatePath } from "next/cache";

//professor

export async function getCourseDates(course_id: number) {
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });

  try {
    const response = await axios.get(
      "http://localhost:5173/api/prof/attendance/dates",
      {
        params: {
          course_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }



}

export async function getAttendanceData(date: string, course_id: number) {
  // console.log(date, course_id);
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });

  try {
    const response = await axios.get(
      "http://localhost:5173/api/prof/attendance/",
      {
        params: {
          date,
          course_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAttendance(
  selectedDate: string,
  attendanceRecords: Array<{
    enrollment_id: number;
    student_id: number;
    student_name: string;
    course_id: number;
    date: string;
    status: boolean;
  }>
) {
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });

  try {
    const response = await axios.post(
      "http://localhost:5173/api/prof/attendance/update",
      JSON.stringify({
        date: selectedDate,
        attendanceRecords,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    revalidatePath("/attendance");
  } catch (error) {
    console.error(error);
  }
}

// student

export async function getStudentAttendance(course_id: number) {
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });

  try {
    const response = await axios.get(
      "http://localhost:5173/api/student/attendance/",
      {
        params: {
          course_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }

}
