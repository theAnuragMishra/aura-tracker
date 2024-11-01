"use client";
import Link from "next/link";
import Header from "@/components/Header2";

interface Course {
  name: string;
  code: string;
  teacher: string;
  progress: number;
}

const courses: Course[] = [
  {
    name: "Introduction to Computer Science",
    code: "CSE101",
    teacher: "Dr. Alice Smith",
    progress: 70,
  },
  {
    name: "Data Structures and Algorithms",
    code: "CSE102",
    teacher: "Prof. John Doe",
    progress: 45,
  },
  {
    name: "Web Development",
    code: "CSE201",
    teacher: "Ms. Jane Lee",
    progress: 85,
  },
  {
    name: "Database Management Systems",
    code: "CSE202",
    teacher: "Dr. Mark Johnson",
    progress: 60,
  },
];

export default function Courses() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-screen bg-[#0d0e22] font-sans overflow-hidden">
        <div className="text-5xl mb-8 pt-10 pb-5 text-white">My Courses</div>
        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((course, index) => (
            <Link key={index} href="/course">
              <div className="bg-white text-black rounded-lg shadow-lg p-6 flex flex-col justify-between w-64 h-50 cursor-pointer transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold">{course.name}</h2>
                <p className="mt-2 text-gray-700">Code: {course.code}</p>
                <p className="mt-2 text-gray-700">Teacher: {course.teacher}</p>
                <div className="mt-4 flex items-center">
                  <div className="relative w-full h-3 bg-gray-200 rounded-full flex-grow">
                    <div
                      className="absolute h-3 bg-purple-600 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 ml-3">
                    {course.progress}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
