"use server";

import axios from "axios";
import jwt from "jsonwebtoken";
import { getBaseURL, getUserDetails } from "./utils";
import { getCurrentSession } from "./auth";

import { revalidatePath } from "next/cache";

export async function addItem(item: {
  itemName: string;
  description: string;
  imageURL: string;
}) {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  const token = jwt.sign(user!, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });

  await axios.post(
    `${getBaseURL()}/api/lnf/items/add`,
    JSON.stringify({ ...item, owner: userData.username }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function toggleFindClaim(id: number, username: string) {
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });

  await axios.post(
    `${getBaseURL()}/api/lnf/items/claim`,
    { id, username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/lostfound");
}
