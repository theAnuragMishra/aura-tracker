"use client";
import { FC } from "react";
import Header from "../components/Header";

interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface Assignment {
  id: number;
  title: string;
  deadline: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  deadline: string;
  description: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Welcome to the Course!",
    date: "2024-10-28",
    content: "We are excited to start this journey together.",
  },
  {
    id: 2,
    title: "Midterm Exam Schedule",
    date: "2024-11-05",
    content: "Midterm exams will be held from Nov 10 to Nov 12.",
  },
];

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Assignment 1: Introduction to Algorithms",
    deadline: "2024-11-01",
    description: "Submit a report on basic algorithms.",
  },
  {
    id: 2,
    title: "Project 1: Build a Simple Web App",
    deadline: "2024-11-15",
    description: "Create a web application using React.",
  },
];

const projects: Project[] = [
  {
    id: 1,
    title: "Web Development Capstone",
    deadline: "2024-12-01",
    description: "Develop a full-stack application as a group.",
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    deadline: "2024-11-20",
    description: "Create a personal portfolio to showcase your projects.",
  },
];

const CoursePage: FC = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#0d0e22] font-sans">
        <aside className="w-60 bg-[#24253a] text-white p-4">
          <h2 className="text-xl font-semibold mb-4 pl-3">Course Menu</h2>
          <ul className="list-disc pl-5">
            <li className="mb-2 pl-1">
              <a href="#announcements">Announcements</a>
            </li>
            <li className="mb-2 pl-1">
              <a href="#assignments">Assignments</a>
            </li>
            <li className="mb-2 pl-1">
              <a href="#projects">Projects</a>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-10 overflow-y-auto">
          <h1 className="text-4xl text-white mb-6">
            Course Name: Web Development
          </h1>

          <section id="announcements" className="mb-10">
            <h2 className="text-3xl text-white mb-4">Announcements</h2>
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white text-black p-4 rounded-lg shadow-md mb-4"
              >
                <h3 className="font-semibold">{announcement.title}</h3>
                <span className="text-gray-600 text-sm">
                  {announcement.date}
                </span>
                <p className="mt-2">{announcement.content}</p>
              </div>
            ))}
          </section>

          <section id="assignments" className="mb-10">
            <h2 className="text-3xl text-white mb-4">Assignments</h2>
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white text-black p-4 rounded-lg shadow-md mb-4"
              >
                <h3 className="font-semibold">{assignment.title}</h3>
                <span className="text-gray-600 text-sm">
                  Deadline: {assignment.deadline}
                </span>
                <p className="mt-2">{assignment.description}</p>
              </div>
            ))}
          </section>

          <section id="projects">
            <h2 className="text-3xl text-white mb-4">Projects</h2>
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white text-black p-4 rounded-lg shadow-md mb-4"
              >
                <h3 className="font-semibold">{project.title}</h3>
                <span className="text-gray-600 text-sm">
                  Deadline: {project.deadline}
                </span>
                <p className="mt-2">{project.description}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default CoursePage;
