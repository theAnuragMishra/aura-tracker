"use server";

export async function handleLogin(data: FormData) {
  console.log(data.get("email"));

  return "";
}
