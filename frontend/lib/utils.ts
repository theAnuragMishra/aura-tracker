import { createSupabaseClient } from "./supabase-client";

export const generateRandomUsername = async () => {
  const supabase = createSupabaseClient();
  const adjectives = ["Swift", "Happy", "Silent", "Bold", "Lucky"];
  const nouns = ["Lion", "Falcon", "Tiger", "Panda", "Wolf"];

  while (true) {
    const username = `${
      adjectives[Math.floor(Math.random() * adjectives.length)]
    }_${nouns[Math.floor(Math.random() * nouns.length)]}_${Math.floor(
      Math.random() * 10000
    )}`;

    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    if (error) {
      console.error(error);
      throw new Error("couldn't generate a username");
    }
    if (!data![0]) {
      return username;
    }
  }
};

export async function getUserDetails(user: { id: number }) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);
  if (error) {
    console.error(error);
    throw new Error("error finding user");
  }
  if (data[0]) {
    return data[0];
  }
}

export async function getUserDetailsByUsername(username: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username);
  if (error) {
    console.error(error);
    throw new Error("error finding user");
  }
  if (data[0]) {
    return data[0];
  }
}

export const validatePassword = (password: string) => {
  const criteria =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return criteria.test(password);
};

export function getBaseURL() {
  if (process.env.NODE_ENV == "development") return "http://localhost:5173";
  else return "";
}
