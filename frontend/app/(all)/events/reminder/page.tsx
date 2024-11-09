"use client";
import { useState } from "react";

const AddReminder: React.FC = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5173/api/events/sendReminder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventName,
            eventDate,
            eventTime,
          }),
        }
      );

      // Log the response object for more insight
      console.log("Response status:", response.status);
      console.log("Response body:", await response.text());

      if (!response.ok) {
        throw new Error("Failed to send reminder");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Reset the form fields
      setEventName("");
      setEventDate("");
      setEventTime("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Set a Reminder
        </h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="eventName"
              className="block text-black font-medium mb-1"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="eventDate"
              className="block text-black font-medium mb-1"
            >
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="eventTime"
              className="block text-black font-medium mb-1"
            >
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg"
          >
            Set Reminder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReminder;
