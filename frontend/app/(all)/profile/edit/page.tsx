import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import EditUI from "../components/EditUI";

export default async function EditProfile() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  return <EditUI data={userData} />;
}
