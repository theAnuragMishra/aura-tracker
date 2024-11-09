"use server";
import { getCurrentSession } from "./auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { getBaseURL } from "./utils";

//prof

export async function createModule(
  moduleName: string,
  moduleDesc: string,
  course_id: string,
  questions: { question: string; options: string[]; correct: string }[],
  aura: string
) {
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });

  try {
    const response = await axios.post(
      "http://localhost:5173/api/prof/module/create",
      JSON.stringify({
        moduleName,
        moduleDesc,
        course_id,
        questions,
        aura,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    revalidatePath("/module");
  } catch (error) {
    console.error(error);
    throw new Error("error creating module");
  }
}

//students

export async function getModules(course_id: number) {
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });
  try {
    const response = await axios.get(`${getBaseURL()}/api/student/modules`, {
      params: {
        course_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function evaluate(
  answers: { question_id: number; option_id: number | null }[],
  module_id: number
) {
  // console.log(answers);
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });
  try {
    const response = await axios.post(
      `${getBaseURL()}/api/student/evaluate`,
      JSON.stringify({
        answers,
        module_id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
