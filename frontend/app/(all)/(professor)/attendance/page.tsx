import axios from "axios";
export default async function Attendance() {
  const res = await axios.get("http://localhost:5173/");
  console.log(res.data);
  return <div>Attendance </div>
}
