"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  username: process.env.USER_USERNAME,
  password: process.env.USER_PASSWORD,
};

const loginSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;

  if (username !== testUser.username || password !== testUser.password) {
    return {
      errors: {
        username: ["Invalid username or password"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
