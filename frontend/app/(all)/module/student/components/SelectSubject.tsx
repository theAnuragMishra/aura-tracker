"use client";

import { getModules } from "@/lib/moduleActions";
import Link from "next/link";
import { useState } from "react";

export default function SelectSubject({
  data,
}: {
  data: {
    course_id: number;
    courses: { course_name: string };
    profiles: { full_name: string };
  }[];
}) {
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [modules, setModules] = useState<
    {
      id: number;
      created_at: string;
      course_id: number;
      module_name: string;
      description: string;
      aura_change: number;
    }[]
  >();
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);

    if (e.target.value) {
      const data = await getModules(Number(e.target.value));
      setModules(data);
    }
  };

  return (
    <div>
      <select
        className="text-black w-fit px-2 py-1 mb-2 rounded-md"
        onChange={handleChange}
        value={subject}
      >
        <option value={undefined}>Select subject</option>
        {data!.map((item, index) => (
          <option key={index} value={item.course_id}>
            {item.courses.course_name}
          </option>
        ))}
      </select>
      <div>
        {modules && <p className="text-2xl mb-1">Modules!</p>}
        <div className="flex flex-col">
          {modules &&
            modules.map((item, index) => (
              <Link
                href={`/module/student/attempt/${item.id}`}
                key={index}
                className="text-blue-400 text-xl"
              >
                {index + 1}. {item.module_name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
