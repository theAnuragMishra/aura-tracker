"use server";

import axios from "axios";
import jwt from "jsonwebtoken";
import { getBaseURL, getUserDetails } from "./utils";
import { getCurrentSession } from "./auth";

import { revalidatePath } from "next/cache";
import { createSupabaseClientJWT } from "./supabase-client";

export async function addItem(
  item: { itemName: string; description: string },
  file: File
) {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("file size exceeded");
  }

  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  const fileExt = file.name.split(".").pop();
  const filePath = `${user!.id}-${Math.random()}.${fileExt}`;

  const token = jwt.sign(user!, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });

  const supabase = await createSupabaseClientJWT();
  const { error: uploadError } = await supabase.storage
    .from("lnf_items")
    .upload(filePath, file);
  if (uploadError) {
    console.error(uploadError);
    throw new Error("couldn't upload image");
  }

  const { data, error } = await supabase.storage
    .from("lnf_items")
    .createSignedUrl(filePath, 60 * 60 * 24 * 365);
  if (error) {
    console.error(error);
    throw new Error("couldn't upload image");
  }

  const imageURL = data?.signedUrl;

  try {
    await axios.post(
      `${getBaseURL()}/api/lnf/items/add`,
      JSON.stringify({ ...item, owner: userData.username, imageURL }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidatePath("/lostfound");
  } catch (error) {
    console.error(error);
  }
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

export async function approveFindClaim(item_id: string, approvee: string) {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  const token = jwt.sign(user!, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });

  await axios.post(
    `${getBaseURL()}/api/lnf/items/approve`,
    { item_id, approvee, username: userData.username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/lostfound");
}
