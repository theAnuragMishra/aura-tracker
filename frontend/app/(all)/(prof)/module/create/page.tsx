"use client";

import { createModule } from "@/lib/moduleActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

export default function Create() {
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; correct: string }[]
  >([{ question: "", options: ["", "", "", ""], correct: "0" }]);
  const [moduleName, setModuleName] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [aura, setAura] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const addQuestions = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correct: "0" },
    ]);
  };
  const handleQuestionChange = (index: number, value: string) => {
    setErrorMessage("");
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };
  const handleOptionChange = (index: number, value: string, pos: number) => {
    setErrorMessage("");
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[pos] = value;
    setQuestions(updatedQuestions);
  };

  const handleSelectChange = (index: number, value: string) => {
    setErrorMessage("");
    const updatedQuestions = [...questions];
    updatedQuestions[index].correct = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestions = (index: number) => {
    setErrorMessage("");
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!moduleName) {
      setErrorMessage("Enter a name for the module");
      return;
    }
    if (!questions.length) {
      setErrorMessage("Add at least a question");
      return;
    }
    let cant = false;
    questions.forEach((item, index) => {
      // console.log(!item.options[0] && !item.options[1] && !item.options[2] && !item.options[3])
      if (!item.question) {
        setErrorMessage(`Enter a valid question for question ${index + 1}`);
        cant = true;
        return;
      }
      if (
        !item.options[0] &&
        !item.options[1] &&
        !item.options[2] &&
        !item.options[3]
      ) {
        setErrorMessage(`Enter at least an option for question ${index + 1}`);
        cant = true;
        return;
      }
      if (!item.options[Number(item.correct)]) {
        setErrorMessage(
          `Error in question ${index + 1}, correct option isn't valid`
        );
        cant = true;
        return;
      }
    });
    if (cant) return;
    try {
      await createModule(moduleName, moduleDesc, 1, questions, aura);
      router.push("/module");
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl ">Create a Module</h1>
      <p className="text-red-500 text-xl mb-5">{errorMessage}</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-1/2"
      >
        <label htmlFor="module_name"></label>
        <input
          value={moduleName}
          onChange={(e) => {
            setErrorMessage("");
            setModuleName(e.target.value);
          }}
          type="text"
          className="mb-3 text-black py-1 px-2 rounded-md text-2xl"
          id="module_name"
          placeholder="Enter the module name"
        />
        <label htmlFor="module_desc"></label>
        <textarea
          className="mb-3 rounded-md px-2 py-1 text-black w-full text-2xl"
          id="module_desc"
          placeholder="What's the module about?"
          value={moduleDesc}
          onChange={(e) => {
            setErrorMessage("");
            setModuleDesc(e.target.value);
          }}
        />
        <label htmlFor="aura"></label>
        <input
          type="text"
          id="aura"
          placeholder="default is 100"
          value={aura}
          onChange={(e) => {
            setErrorMessage("");
            setAura(e.target.value);
          }}
          className="text-black rounded-md px-2 py-1 mb-2"
        />

        {questions.map((field, index) => (
          <div className="w-full" key={index} style={{ marginBottom: "10px" }}>
            <div className="flex relative justify-between mb-2">
              <div className="absolute -left-5 text-xl">{index + 1}</div>
              <textarea
                className="w-[90%] text-black rounded-md px-2 py-1"
                value={field.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder={`Question ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeQuestions(index)}
                style={{ marginLeft: "5px" }}
              >
                <FaCircleMinus className="text-4xl" />
              </button>
            </div>
            <div className="grid gap-2 grid-rows-2 text-black grid-cols-2 w-full">
              <div>
                <label htmlFor={`option${index}1`}></label>
                <input
                  type="text"
                  id={`option${index}1`}
                  placeholder="option a"
                  className="px-2 py-1 w-full rounded-md"
                  value={field.options[0]}
                  onChange={(e) => handleOptionChange(index, e.target.value, 0)}
                />
              </div>
              <div>
                <label htmlFor={`option${index}2`}></label>
                <input
                  type="text"
                  id={`option${index}2`}
                  placeholder="option b"
                  className="w-full px-2 py-1 rounded-md"
                  value={field.options[1]}
                  onChange={(e) => handleOptionChange(index, e.target.value, 1)}
                />
              </div>
              <div>
                <label htmlFor={`option${index}3`}></label>
                <input
                  type="text"
                  id={`option${index}3`}
                  placeholder="option c"
                  className="w-full px-2 py-1 rounded-md"
                  value={field.options[2]}
                  onChange={(e) => handleOptionChange(index, e.target.value, 2)}
                />
              </div>
              <div>
                <label htmlFor={`option${index}4`}></label>
                <input
                  type="text"
                  id={`option${index}4`}
                  placeholder="option d"
                  className="w-full px-2 py-1 rounded-md"
                  value={field.options[3]}
                  onChange={(e) => handleOptionChange(index, e.target.value, 3)}
                />
              </div>
            </div>
            <div className="w-full text-center mt-2 mb-2">
              <select
                onChange={(e) => {
                  handleSelectChange(index, e.target.value);
                }}
                className="w-1/3 px-2 py-1 rounded-md text-black text-center "
                value={field.correct}
              >
                <option value="0">a</option>
                <option value="1">b</option>
                <option value="2">c</option>
                <option value="3">d</option>
              </select>
            </div>
          </div>
        ))}
        <button type="button" onClick={addQuestions}>
          <FaCirclePlus className="text-4xl" />
        </button>

        <button
          type="submit"
          className="mt-4 bg-white text-black px-3 text-xl rounded-md py-2 border-2"
        >
          Save
        </button>
      </form>
    </div>
  );
}
