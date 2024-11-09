import clsx from "clsx";
import { FaFireAlt } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

// interface Answer {
//   question_id: number;
//   option_id: number | null;
// }

export default function AlreadySolved({ data }: any) {
  const correctCount = data.questions.reduce(
    (count: number, item: any) =>
      count + (item.correct_option === item.chosen_option ? 1 : 0),
    0
  );

  const aura_gain = (correctCount * data.aura_change) / data.questions.length;

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="flex w-full justify-between mb-3">
        <h1 className="text-2xl mb-3">{data.module_name}</h1>

        <p className=" text-2xl flex justify-end items-center">
          {correctCount}
          <FaCircleCheck className="inline mx-2 text-green-500" />
          {data.questions.length - correctCount}
          <FaCircleXmark className="inline mx-2 text-red-500" />
        </p>
        <p className="text-3xl">
          {aura_gain} aura gained!{" "}
          <FaFireAlt className="inline text-yellow-400" />
        </p>
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
                className={clsx(
                  "bg-white text-black px-2 py-1 rounded-md text-2xl",
                  {
                    "border-blue-400 border-2":
                      item.chosen_option === option.id,
                    "bg-red-400":
                      item.correct_option !== option.id &&
                      item.chosen_option === option.id,
                    "bg-green-400": item.correct_option === option.id,
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
    </div>
  );
}
