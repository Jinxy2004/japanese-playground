/*
This is a data access layer file. Its purpose is to check if the users session is valid,
and then based upon those results either redirect the user, or return information.
*/

import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { supabase } from "./supabaseClient";
import { cache } from "react";

// This function can be used anywhere to make sure that the user is logged in, it could also be used to say verify admin roles.
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/app/user-account");
  }

  return { isAuth: true, userId: session.userId, role: session.role };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  try {
    const data = await supabase
      .from("users")
      .select("userId")
      .eq("userId", session.userId)
      .single();

    const user = data;

    return user;
  } catch (error) {
    console.log("Failed to fetch user.");
    return null;
  }
});
