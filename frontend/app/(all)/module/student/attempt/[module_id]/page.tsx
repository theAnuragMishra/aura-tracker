import { getCurrentSession } from "@/lib/auth";
import { getBaseURL, getUserDetails } from "@/lib/utils";
import axios from "axios";
import jwt from "jsonwebtoken";
import Questions from "./components/Questions";
import AlreadySolved from "./components/AlreadySolved";

export default async function Attempt({
  params,
}: {
  params: { module_id: string };
}) {
  const paramss = await params;
  const module_id = paramss.module_id;

  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  if (userData.role !== "student") {
    return <div>Let student&apos;s solve modules :)</div>;
  }

  const token = jwt.sign(userData!, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });
  let data;
  let solved: boolean = false;
  try {
    const response = await axios.get(`${getBaseURL()}/api/student/module`, {
      params: {
        module_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);

    data = response.data.data[0];
    solved = response.data.solved;
  } catch (error) {
    console.error(error);
  }
  // console.log(data?.data);

  if (!data) {
    return (
      <div>
        <div className="text-5xl">No such module!</div>
      </div>
    );
  }

  const notSolvedData = {
    id: data.id,
    module_name: data.module_name,
    description: data.description,
    aura_change: data.aura_change,
    questions: data.questions.map(
      (question: {
        id: number;
        options: { id: number; option_text: string; question_id: number }[];
        question_text: string;
      }) => ({
        id: question.id,
        options: question.options.map((option) => ({
          id: option.id,
          option_text: option.option_text,
          question_id: option.question_id,
        })),
        question_text: question.question_text,
      })
    ),
  };

  // console.log(data);

  if (solved) {
    const solvedData = {
      ...notSolvedData,
      questions: notSolvedData.questions.map(
        (
          question: {
            id: number;
            options: { id: number; option_text: string; question_id: number }[];
            question_text: string;
            student_question: { chosen_option_id: number }[];
            correct_option: number;
          },
          index: number
        ) => ({
          ...question,
          chosen_option:
            data.questions[index].student_question[0].chosen_option_id,
          correct_option: data.questions[index].correct_option,
        })
      ),
    };
    return (
      <div className="text-5xl">
        <AlreadySolved data={solvedData} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Questions data={notSolvedData} />
      </div>
    </div>
  );
}
