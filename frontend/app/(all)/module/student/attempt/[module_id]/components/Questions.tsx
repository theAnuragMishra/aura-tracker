"use client";

import { useState } from "react";
import { ModuleData } from "./ModuleInterface";
import clsx from "clsx";
import { evaluate } from "@/lib/moduleActions";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

interface Answer {
  question_id: number;
  option_id: number | null;
}

export default function Questions({ data }: { data: ModuleData }) {
  const module_id = data.id;

  const initialAnswers = data.questions.map((item) => ({
    question_id: item.id,
    option_id: null,
  }));

  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [finalAnswers, setFinalAnswers] = useState<number[] | null>(null);
  const [correctCount, setCorrectCount] = useState<number | null>(null);

  const handleClick = (question_index: number, option_id: number) => {
    // console.log("click");
    const updatedAnswers = [...answers];
    updatedAnswers[question_index].option_id = option_id;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const data = await evaluate(answers, module_id);
    setFinalAnswers(data.finalAnswers);
    setCorrectCount(data.correct_answers);
    // console.log(data);
  };

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl mb-3">{data.module_name}</h1>
        {correctCount !== null && (
          <p className=" text-2xl flex justify-end items-center">
            {correctCount}
            <FaCircleCheck className="inline mx-2 text-green-500" />
            {answers.length - correctCount}
            <FaCircleXmark className="inline mx-2 text-red-500" />
          </p>
        )}
      </div>
      {data.questions.map((item, index) => (
        <div key={index} className="mb-2 w-full">
          <p className="text-3xl mb-2">
            {index + 1}. {item.question_text}
          </p>
          <div className="grid grid-rows-2 grid-cols-2 gap-x-8 gap-y-2">
            {item.options.map((option, i) => (
              <div
                key={i}
                onClick={() => {
                  handleClick(index, option.id);
                }}
                className={clsx(
                  "bg-white text-black px-2 py-1 rounded-md text-2xl",
                  {
                    "border-blue-600 border-2":
                      answers[index].option_id === option.id,
                    "bg-green-500":
                      finalAnswers && finalAnswers[index] === option.id,
                    "bg-red-500":
                      finalAnswers && finalAnswers[index] !== option.id,
                  }
                )}
              >
                <span className="mr-3">{["a", "b", "c", "d"][i]}.</span>
                {option.option_text}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        className="w-[150px] absolute bottom-[50px] px-2 py-1 rounded-lg text-2xl bg-white text-black"
        type="button"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
