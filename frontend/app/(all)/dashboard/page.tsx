import { FC } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Calendar from "@/components/Calender";

import { getCurrentSession } from "@/lib/auth";

import { getUserDetails } from "@/lib/utils";

const Dashboard: FC = async () => {
  const { user } = await getCurrentSession();

  const userData = await getUserDetails(user!);

  return (
    <div className="flex">
      <Sidebar name={userData.username} />
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
