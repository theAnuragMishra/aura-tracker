import Header from "./components/Header";
import Calendar from "@/components/Calender";

export default async function Dashboard() {
  return (
    <div className="flex flex-col">
      <Header />

      <Calendar />
    </div>
  );
}
