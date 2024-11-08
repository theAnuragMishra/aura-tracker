import { getCurrentSession } from "@/lib/auth";
import { getBaseURL, getUserDetails } from "@/lib/utils";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ModuleData } from "./components/ModuleInterface";
import Questions from "./components/Questions";

export default async function Attempt({
  params,
}: {
  params: { module_id: string };
}) {
  const paramss = await params;
  const module_id = paramss.module_id;

  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  if (userData.role !== "student") {
    return <div>Let student&apos;s solve modules :)</div>;
  }

  const token = jwt.sign(userData!, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });
  let data: ModuleData | null = null;
  try {
    const response = await axios.get(`${getBaseURL()}/api/student/module`, {
      params: {
        module_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data[0].questions[0].options);
    data = response.data[0];
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      {data && (
        <div>
          <Questions data={data} />
        </div>
      )}
    </div>
  );
}
