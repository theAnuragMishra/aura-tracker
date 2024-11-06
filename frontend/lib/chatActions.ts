"use server";

import axios from "axios";
import { getBaseURL } from "./utils";
import { getCurrentSession } from "./auth";
import jwt from "jsonwebtoken";

export async function getMessagesForAChat(conversationId: string) {
  const { user } = await getCurrentSession();

  const token = jwt.sign(user!, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });
  try {
    const response = await axios.get(`${getBaseURL()}/api/chat/messages`, {
      params: {
        conversationId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //   console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
