"use server"
import { getCurrentSession } from "./auth";
import axios from "axios";
import jwt from "jsonwebtoken"
import { revalidatePath } from "next/cache";

export async function createModule(
  moduleName: string,
  moduleDesc: string,
  course_id: number,
  questions: { question: string, options: string[], correct: string }[],
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
        aura
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
    throw new Error("error creating module")
  }
}

