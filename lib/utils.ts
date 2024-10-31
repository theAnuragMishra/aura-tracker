import {
  createSupabaseClient,
  createSupabaseClientJWT,
} from "./supabase-client";

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
  const supabase = await createSupabaseClientJWT();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);
  if (error) {
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
