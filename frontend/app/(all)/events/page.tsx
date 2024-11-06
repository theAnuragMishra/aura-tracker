"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Event = {
  id: number;
  name: string;
  date: string; // Store date as a string to avoid SSR issues
  description: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const initialEvents: Event[] = [
  {
    id: 1,
    name: "Mathematics Final Exam",
    date: "2024-12-10T09:00:00",
    description: "Final exam covering algebra, calculus, and geometry.",
  },
  {
    id: 2,
    name: "Physics Theory Exam",
    date: "2023-12-15T11:00:00",
    description:
      "Covers thermodynamics, electromagnetism, and quantum physics.",
  },
  {
    id: 3,
    name: "Chemistry Practical Exam",
    date: "2025-12-20T10:00:00",
    description: "Practical assessment on organic and inorganic chemistry.",
  },
  {
    id: 4,
    name: "Project Submission",
    date: "2024-11-30T17:00:00",
    description: "Submit your final year project.",
  },
];

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [timeLeft, setTimeLeft] = useState<TimeLeft[]>(
    initialEvents.map(() => ({ days: 0, hours: 0, minutes: 0, seconds: 0 }))
  );

  useEffect(() => {
    const calculateTimeLeft = (eventDate: Date): TimeLeft => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      return {
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
      };
    };

    const updateTimeLeft = () => {
      setTimeLeft(
        events.map((event) => calculateTimeLeft(new Date(event.date)))
      );
    };

    updateTimeLeft(); // Initial update
    const timer = setInterval(updateTimeLeft, 1000); // Update every second

    return () => clearInterval(timer);
  }, [events]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
        Upcoming Events
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-2xl font-bold text-black mb-2 text-center">
              {event.name}
            </h2>
            <p className="text-center text-gray-600 mb-1">
              {formatDate(event.date)}
            </p>
            <p className="text-gray-700 mb-4 text-center">
              {event.description}
            </p>
            <div className="flex justify-around text-xl font-semibold text-gray-800 mb-4">
              <div className="flex flex-col items-center">
                <span className="bg-purple-200 rounded-lg px-4 py-2 shadow-md">
                  {timeLeft[index]?.days ?? 0}
                </span>
                <span className="text-sm text-gray-600 mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-purple-200 rounded-lg px-4 py-2 shadow-md">
                  {timeLeft[index]?.hours ?? 0}
                </span>
                <span className="text-sm text-gray-600 mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-purple-200 rounded-lg px-4 py-2 shadow-md">
                  {timeLeft[index]?.minutes ?? 0}
                </span>
                <span className="text-sm text-gray-600 mt-1">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-purple-200 rounded-lg px-4 py-2 shadow-md">
                  {timeLeft[index]?.seconds ?? 0}
                </span>
                <span className="text-sm text-gray-600 mt-1">Seconds</span>
              </div>
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <Link
                href="/events/reminder"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                Add Reminder
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
