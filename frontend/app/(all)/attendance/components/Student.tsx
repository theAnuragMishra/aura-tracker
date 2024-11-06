'use client'

import { useState } from "react";

export default function Attendance() {

  const [date, setDate] = useState(Date.now());
  return <div><h1>Attendance</h1>
    <input type="date" className="text-black" value={date} onChange={(e) => { setDate(e.target.value) }} />

  </div>
}
