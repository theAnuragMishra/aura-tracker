import { createSupabaseClient } from "./supabase-client";

export const generateRandomUsername = async () => {
  const supabase = createSupabaseClient();
  const adjectives = ["Swift", "Happy", "Silent", "Bold", "Lucky"];
  const nouns = ["Lion", "Falcon", "Tiger", "Panda", "Wolf"];

  for (let i = 0; i < 100; i++) {
    // Attempt up to 10 times
    const username = `${
      adjectives[Math.floor(Math.random() * adjectives.length)]
    }_${nouns[Math.floor(Math.random() * nouns.length)]}_${Math.floor(
      Math.random() * 10000
    )}`;

    const { data } = await supabase
      .from("users")
      .select("username")
      .eq("username", username); // Check if username exists
    if (!data![0]) {
      return username; // Unique username found
    }
  }

  // As a fallback, append a UUID or larger random number
  return `user_${Math.floor(Math.random() * 10000)}`;
};
