"use client";
import { useState } from "react";
import AttendanceDateList from "./AttendanceDateList";
import { getAttendanceData, getCourseDates, updateAttendance } from "@/lib/attendanceActions";

export default function AttendanceUI({
  courses,
}: {
  courses: { id: number; course_name: string }[];
}) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [dates, setDates] = useState<{ unique_dates: string }[]>([])

  const [attendanceRecords, setAttendanceRecords] = useState<
    Array<{
      enrollment_id: number;
      student_id: number;
      student_name: string;
      course_id: number;
      date: string;
      status: boolean;
    }>
  >([]);

  const courseName = courses.find(element => element.id === Number(course))?.course_name;

  const selectDate = async (
    date: string,
  ) => {
    setSelectedDate(date);
    const data = await getAttendanceData(date, Number(course));
    setAttendanceRecords(data);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourse(e.target.value)
    if (e.target.value) {
      const data = await getCourseDates(Number(e.target.value));
      setDates(data);
      setSelectedDate("")
      setAttendanceRecords([]);

    }

  }


  const handleToggleAttendance = (studentId: number) => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.student_id === studentId
          ? { ...record, status: !record.status }
          : record
      )
    );
  };
  const handleSave = async (
    selectedDate: string,
    attendanceRecords: Array<{
      enrollment_id: number;
      student_id: number;
      student_name: string;
      course_id: number;
      date: string;
      status: boolean;
    }>
  ) => {
    await updateAttendance(selectedDate, attendanceRecords);
    alert("Attendance saved!");
  };

  return (
    <div className="flex flex-col">
      <p className="text-2xl mb-1">Select a subject</p>
      <select className="text-black w-fit px-2 py-1 mb-2" onChange={handleChange} value={course}>
        <option value={undefined}>Select subject</option>
        {courses!.map((item, index) => (<option key={index} value={item.id}>{item.course_name}</option>))}
      </select>

      {course && <div className="">
        <AttendanceDateList dates={dates} onSelectDate={selectDate} />
      </div>}
      {selectedDate && (
        <div className="flex flex-col items-start">
          <h2 className="text-4xl text-yellow-400 mb-5">
            Attendance for {courseName} on {selectedDate}
          </h2>
          <ul className="columns-2 w-full gap-5 border p-2 [column-rule:1px_solid_theme(borderColor.DEFAULT)]">
            {attendanceRecords && attendanceRecords.map((record) => (
              <li key={record.student_id} className="text-lg p-2 flex">
                <div className="w-full">{record.student_name}</div>
                <button
                  onClick={() => handleToggleAttendance(record.student_id)}
                  className="bg-gray-400 text-black text-center px-2 rounded-lg py-0.5 w-[100px]"
                >
                  {record.status ? "Present" : "Absent"}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              handleSave(selectedDate, attendanceRecords);
            }}
            className="text-2xl w-full rounded-sm bg-white px-4 py-1 text-black mt-5"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
