import { FC } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Calendar from "../components/Calender";


const Dashboard: FC = () => {
  return (    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
