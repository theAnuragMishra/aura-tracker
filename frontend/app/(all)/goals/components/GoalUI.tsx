"use client";
import { useState, ChangeEvent } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { addGoal, deleteGoal, toggleGoalCompletion } from "@/lib/goalActions";

interface Goal {
  id: number;
  goal_text: string;
  created_at: string;
  priority: string;
  completed_at?: string;
}

export default function GoalUI({ goals }: { goals: Goal[] }) {
  const [newGoal, setNewGoal] = useState<string>("");
  const [priority, setPriority] = useState<string>("Medium");

  const handleAdd = async () => {
    if (newGoal.trim()) {
      await addGoal(newGoal, priority);
      setNewGoal("");
      setPriority("Medium");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteGoal(id);
  };

  const toggleCompletion = async (id: number, index: number) => {
    await toggleGoalCompletion(id, goals[index].completed_at ? true : false);
  };

  const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGoal(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  return (
    <div className="flex flex-col items-center h-full p-10 bg-[#0d0e22] font-sans">
      <div className="text-5xl mb-5 text-white">Upcoming Goals</div>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-6xl">
          <div className="goals-input mb-4">
            <div className="flex items-center">
              <input
                type="text"
                className="input flex-grow border rounded px-2 py-1 mr-3 text-black"
                placeholder="Enter goal"
                value={newGoal}
                onChange={handleGoalChange}
              />
              <select
                className="border rounded px-2 py-1 mr-3 text-black"
                value={priority}
                onChange={handlePriorityChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button
                className="ml-2 bg-purple-600 text-white rounded px-4 py-1"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>

          <table className="min-w-full bg-gray-700 text-white border border-gray-600">
            <thead>
              <tr className="text-left">
                <th className="py-3 px-4 border-b border-gray-600">Goal</th>
                <th className="py-3 px-4 border-b border-gray-600">Priority</th>
                <th className="py-3 px-4 border-b border-gray-600">
                  Date Created
                </th>
                <th className="py-3 px-4 border-b border-gray-600">
                  Completed At
                </th>
                <th className="py-3 px-4 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-600 bg-gray-600 opacity-70"
                >
                  <td className="py-3 px-4 flex items-center">
                    {item.completed_at ? (
                      <FaRegCheckSquare
                        className="check-icon cursor-pointer mr-2 text-green-500"
                        onClick={() => toggleCompletion(item.id, index)}
                      />
                    ) : (
                      <FaRegSquare
                        className="check-icon cursor-pointer mr-2 text-yellow-500"
                        onClick={() => toggleCompletion(item.id, index)}
                      />
                    )}
                    <span
                      className={`${item.completed_at ? "line-through" : ""}`}
                    >
                      {item.goal_text}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-600">
                    <span
                      className={
                        item.priority === "High"
                          ? "text-red-500"
                          : item.priority === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-600">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-600">
                    {item.completed_at
                      ? new Date(item.completed_at).toLocaleString()
                      : "Not completed"}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-600">
                    <MdDeleteForever
                      className="icon cursor-pointer text-red-500"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
