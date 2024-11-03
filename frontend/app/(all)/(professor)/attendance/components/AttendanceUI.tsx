"use client";
import { useState } from "react";
import AttendanceDateList from "./AttendanceDateList";
import { getAttendanceData, updateAttendance } from "@/lib/attendanceActions";

export default function AttendanceUI({
  dates,
}: {
  dates: { unique_dates: string[]; course_id: number; course_name: string }[];
}) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

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

  const selectDate = async (
    date: string,
    course: string,
    course_id: number
  ) => {
    setSelectedDate(date);
    setSelectedCourse(course);
    const data = await getAttendanceData(date, course_id);
    setAttendanceRecords(data);
  };

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
    <div>
      <div className="">
        <AttendanceDateList dates={dates} onSelectDate={selectDate} />
      </div>
      {selectedDate && (
        <div className="flex flex-col items-start">
          <h2 className="text-4xl text-yellow-400 mb-5">
            Attendance for {selectedCourse} on {selectedDate}
          </h2>
          <ul className="grid grid-cols-2 w-full gap-5">
            <li className="text-lg w-full flex justify-between">
              <span className="w-[500px]">Name</span>
              <span className="w-[50px]">Status</span>
            </li>
            <li className="text-lg w-full flex justify-between">
              <span className="w-[500px]">Name</span>
              <span className="w-[50px]">Status</span>
            </li>
            {attendanceRecords.map((record) => (
              <li key={record.student_id} className="text-lg flex">
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
            className="text-2xl rounded-sm bg-white px-4 py-1 text-black mt-5"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
