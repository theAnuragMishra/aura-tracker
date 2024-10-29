"use client";
import { FC, useState } from "react";
import Header from "../components/Header2";

interface Resource {
  id: number;
  title: string;
  type: "Lecture Note" | "Video" | "External Link";
  link: string;
}

interface Chapter {
  id: number;
  title: string;
  resources: Resource[];
}

interface Module {
  id: number;
  title: string;
  chapters: Chapter[];
}

const modules: Module[] = [
  {
    id: 1,
    title: "Module 1: Introduction to Web Development",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Basics of HTML",
        resources: [
          {
            id: 1,
            title: "Lecture Notes",
            type: "Lecture Note",
            link: "/notes/html-basics.pdf",
          },
          {
            id: 2,
            title: "Intro to HTML Video",
            type: "Video",
            link: "https://youtu.be/dQw4w9WgXcQ",
          },
        ],
      },
      {
        id: 2,
        title: "Chapter 2: Basics of CSS",
        resources: [
          {
            id: 3,
            title: "CSS Basics",
            type: "Lecture Note",
            link: "/notes/css-basics.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: JavaScript Essentials",
    chapters: [],
  },
];

const CourseMaterial: FC = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#0d0e22] font-sans text-gray-200">
        <aside className="w-56 bg-[#24253a] p-5 text-white">
          <h2 className="text-xl font-semibold mb-6">Course Menu</h2>
          <ul className="list-disc pl-5 space-y-3 text-base">
            <li>
              <a href="/course" className="hover:text-purple-400">
                Course Home
              </a>
            </li>
            <li>
              <a href="#announcements" className="hover:text-purple-400">
                Announcements
              </a>
            </li>
            <li>
              <a href="#assignments" className="hover:text-purple-400">
                Assignments
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-purple-400">
                Projects
              </a>
            </li>
            <li>
              <a href="/course_material" className="hover:text-purple-400">
                Course Material
              </a>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            Course Materials
          </h1>

          {modules.length === 0 ? (
            <p className="text-center text-gray-500">
              No material available for this course.
            </p>
          ) : (
            modules.map((module) => (
              <div
                key={module.id}
                className="bg-white p-6 rounded-lg shadow-md mb-6"
              >
                <h2
                  className="text-2xl font-semibold text-purple-600 mb-4 cursor-pointer"
                  onClick={() =>
                    setExpandedModule(
                      expandedModule === module.id ? null : module.id
                    )
                  }
                >
                  {module.title}
                  <span className="float-right text-purple-400">
                    {expandedModule === module.id ? "−" : "+"}
                  </span>
                </h2>

                {expandedModule === module.id && (
                  <div className="pl-4">
                    {module.chapters.length === 0 ? (
                      <p className="text-gray-400 italic">
                        No chapters available in this module.
                      </p>
                    ) : (
                      module.chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          className="bg-gray-50 p-4 rounded-md shadow-sm mb-3 border border-gray-200"
                        >
                          <h3
                            className="text-lg font-medium text-gray-700 mb-2 cursor-pointer"
                            onClick={() =>
                              setExpandedChapter(
                                expandedChapter === chapter.id
                                  ? null
                                  : chapter.id
                              )
                            }
                          >
                            {chapter.title}
                            <span className="float-right text-purple-400">
                              {expandedChapter === chapter.id ? "−" : "+"}
                            </span>
                          </h3>

                          {expandedChapter === chapter.id && (
                            <ul className="space-y-2 pl-4">
                              {chapter.resources.length === 0 ? (
                                <p className="text-gray-400 italic">
                                  No resources available in this chapter.
                                </p>
                              ) : (
                                chapter.resources.map((resource) => (
                                  <li key={resource.id} className="text-base">
                                    <a
                                      href={resource.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-purple-500 hover:text-purple-700"
                                    >
                                      {resource.title} ({resource.type})
                                    </a>
                                  </li>
                                ))
                              )}
                            </ul>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default CourseMaterial;
