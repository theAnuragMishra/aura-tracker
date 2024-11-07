"use client"

import { getStudentAttendance } from "@/lib/attendanceActions"
import clsx from "clsx";
import { useState } from "react"

export default function SelectSubject({ data }: { data: { course_id: number, courses: { course_name: string }, profiles: { full_name: string } }[] }) {
  const [subject, setSubject] = useState<string | undefined>(undefined)
  const [attendanceData, setattendanceData] = useState<{ date: string, status: boolean }[]>();

  // console.log(subject);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value)

    if (e.target.value) {
      const data = await getStudentAttendance(Number(e.target.value));
      setattendanceData(data);
    }
  }

  const result = attendanceData?.reduce((acc, record) => {
    acc.total++;
    const { status } = record;
    if (status) acc.present++;
    return acc;
  }
    , { total: 0, present: 0 }
  )

  let percentAttendance;
  if (result) {
    percentAttendance = result.present * 100 / result.total;
  }
  return <div className="flex flex-col">

    <p className="text-2xl mb-1">Select a subject</p>
    <select className="text-black w-fit px-2 py-1 mb-2" onChange={handleChange} value={subject}>
      <option value={undefined}>Select subject</option>
      {data!.map((item, index) => (<option key={index} value={item.course_id}>{item.courses.course_name}</option>))}
    </select>
    {percentAttendance ? (<p className={clsx({ "text-green-500": percentAttendance >= 75, "text-red-500": percentAttendance < 75 })}>{percentAttendance}% Attendance</p>) : percentAttendance === 0 ? (<p className="text-red-500">{percentAttendance}% Attendance</p>) : null}
    <div className="mt-3">    <ul>
      {attendanceData?.map((item, index) => (<li key={index}>{item.date} - {item.status ? "Present" : "Absent"}</li>))}
    </ul></div>

  </div>

}
