"use server";

import { signIn } from "../../../auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/admin",
    });
  } catch (error) {
    if ((error as any).type === "CredentialsSignin") {
      return { error: "Nieprawidłowy email lub hasło." };
    }
    throw error; // Let Next.js handle redirects thrown by signIn
  }
}
