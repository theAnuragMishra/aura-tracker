import { getCurrentSession } from "@/lib/auth";
import { getBaseURL, getUserDetails } from "@/lib/utils";
import axios from "axios";
import jwt from "jsonwebtoken";
import Item from "./components/item";
import Link from "next/link";

export default async function LostItemsPage() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "10m" });

  const response = await axios.get(`${getBaseURL()}/api/lnf/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data);

  return (
    <div className="bg-gray-900 text-white p-8 flex flex-col">
      <div className="flex text-2xl mb-4 justify-between">
        <h1>Lost Items</h1>
        <Link
          className="bg-white text-black px-2 py-1 rounded-md"
          href="/lostfound/add"
        >
          Register a lost item
        </Link>
      </div>
      {response.data.length === 0 ? (
        <p className="text-gray-400">No one has lost anything yet *_*</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.data.map((item: any, index) => (
            <Item key={index} item={item} username={userData.username} />
          ))}
        </ul>
      )}
    </div>
  );
}
