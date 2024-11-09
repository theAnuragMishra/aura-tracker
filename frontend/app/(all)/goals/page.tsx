import { getCurrentSession } from "@/lib/auth";
import GoalUI from "./components/GoalUI";
import { getUserDetails } from "@/lib/utils";
const { user } = await getCurrentSession();
const userData = await getUserDetails(user!);

export default async function Goals() {
  if (!["student", "professor"].includes(userData.role)) {
    return <div>Set your goals somewhere else, alright?</div>;
  }
  return <GoalUI />;
}
