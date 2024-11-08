"use client";

import { getModules } from "@/lib/moduleActions";
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
        className="text-black w-fit px-2 py-1 mb-2"
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
        <p>Modules!</p>
        {modules &&
          modules.map((item, index) => (
            <div key={index}>{item.module_name}</div>
          ))}
      </div>
    </div>
  );
}
