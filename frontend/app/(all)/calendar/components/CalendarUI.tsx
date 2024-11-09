"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
  color: string;
}

export default function CalendarUI() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [taskText, setTaskText] = useState("");
  const [taskColor, setTaskColor] = useState("#ff0000");

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = Array.from(
    { length: daysInMonth(currentMonth, currentYear) },
    (_, i) => i + 1
  );

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const handleAddTask = () => {
    if (!taskText) return;
    const dateKey = `${currentYear}-${currentMonth}-${selectedDay}`;
    const newTask = { id: Date.now(), text: taskText, color: taskColor };

    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTask],
    }));

    setTaskText("");
    setTaskColor("#ff0000");
    setSelectedDay(null);
  };

  const handleDeleteTask = (taskId: number) => {
    if (selectedDay === null) return;
    const dateKey = `${currentYear}-${currentMonth}-${selectedDay}`;
    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((task) => task.id !== taskId),
    }));
  };

  const closeTaskModal = () => setSelectedDay(null);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="bg-purple-600 p-2 rounded-md"
        >
          Previous
        </button>
        <span className="text-xl font-bold">
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            new Date(currentYear, currentMonth)
          )}{" "}
          {currentYear}
        </span>
        <button
          onClick={handleNextMonth}
          className="bg-purple-600 p-3 rounded-md"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateKey = `${currentYear}-${currentMonth}-${day}`;
          const dayTasks = tasks[dateKey] || [];
          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`relative border border-gray-600 bg-gray-600 bg-opacity-70 p-4 text-center rounded-md h-20 cursor-pointer ${
                selectedDay === day
                  ? "border-blue-400 shadow-lg shadow-blue-400"
                  : ""
              }`}
            >
              <span className="text-xl">{day}</span>
              <div className="flex gap-1 mt-2">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{ backgroundColor: task.color }}
                    className="w-3 h-3 rounded-full"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Modal */}
      {selectedDay !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className=" bg-gray-600 bg-opacity-50 p-6 rounded-lg w-100">
            <h2 className="text-lg  mb-4 text-gray-200">
              Tasks for {selectedDay}
            </h2>
            <ul className="mb-4 ">
              {(
                tasks[`${currentYear}-${currentMonth}-${selectedDay}`] || []
              ).map((task) => (
                <li
                  key={task.id}
                  style={{ color: task.color }}
                  className="flex justify-between mb-2 items-center"
                >
                  <span>{task.text}</span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-purple-600 text-white p-1 rounded-md"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="New Task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
            />
            <input
              type="color"
              value={taskColor}
              onChange={(e) => setTaskColor(e.target.value)}
              className="w-full mb-4"
            />
            <button
              onClick={handleAddTask}
              className="bg-gray-900 p-2 w-full rounded text-white"
            >
              Add Task
            </button>
            <button
              onClick={closeTaskModal}
              className="bg-gray-900 p-2 w-full rounded text-white mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
