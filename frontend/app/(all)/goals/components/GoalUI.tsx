"use client";
import { useState, ChangeEvent } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";

interface Goal {
  goal: string;
  completed: boolean;
  dateCreated: string;
  priority: string;
  completedTime?: string;
}

export default function GoalUI() {
  const [allGoals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const [priority, setPriority] = useState<string>("Medium");

  const handleAdd = () => {
    if (newGoal.trim()) {
      const updatedGoals = [
        ...allGoals,
        {
          goal: newGoal,
          completed: false,
          dateCreated: new Date().toLocaleString(),
          priority: priority,
        },
      ];
      setGoals(updatedGoals);
      setNewGoal("");
      setPriority("Medium");
    }
  };

  const handleDelete = (index: number) => {
    const updatedGoals = [...allGoals];
    updatedGoals.splice(index, 1);
    setGoals(updatedGoals);
  };

  const toggleCompletion = (index: number) => {
    const updatedGoals = [...allGoals];
    const goal = updatedGoals[index];
    if (!goal.completed) {
      goal.completed = true;
      goal.completedTime = new Date().toLocaleString();
    } else {
      goal.completed = false;
      goal.completedTime = undefined;
    }
    setGoals(updatedGoals);
  };

  const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGoal(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-10 bg-[#0d0e22] font-sans">
      <div className="text-5xl mb-8 pb-5 text-white">Upcoming Goals</div>
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
              {allGoals.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-600 bg-gray-600 opacity-70"
                >
                  <td className="py-3 px-4 flex items-center">
                    {item.completed ? (
                      <FaRegCheckSquare
                        className="check-icon cursor-pointer mr-2 text-green-500"
                        onClick={() => toggleCompletion(index)}
                      />
                    ) : (
                      <FaRegSquare
                        className="check-icon cursor-pointer mr-2 text-yellow-500"
                        onClick={() => toggleCompletion(index)}
                      />
                    )}
                    <span className={`${item.completed ? "line-through" : ""}`}>
                      {item.goal}
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
                    {item.dateCreated}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-600">
                    {item.completed ? item.completedTime : "Not completed"}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-600">
                    <MdDeleteForever
                      className="icon cursor-pointer text-red-500"
                      onClick={() => handleDelete(index)}
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
