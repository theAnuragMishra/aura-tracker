import { FC } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Calendar from "../components/Calender";

import { getCurrentSession } from "../lib/auth";
import { createSupabaseClient } from "../lib/supabase-client";

const Dashboard: FC = async () => {
  let username = "";
  const { user } = await getCurrentSession();
  console.log(user);
  if (user) {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("id", user.id);
    if (data![0]) {
      username = data![0].username;
    }
  }
  return (
    <div className="flex">
      <Sidebar name={username} />
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
