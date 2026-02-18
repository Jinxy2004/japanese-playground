"use server";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { supabaseAdmin } from "../lib/supabaseServer";
import bcrypt from "bcryptjs";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // Validate the form fields received from user submission
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Returns early if any fields do not match, which stops us from invoking the server and wasting resources.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;
  const role = "user";

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabaseAdmin
    .from("users")
    .insert([{ username, email, hashedPassword, role }])
    .select()
    .single();
  if (error) {
    return { message: "Error inserting: " + error.message };
  } else if (!data) {
    return { message: "insert not successful." };
  } else {
    await createSession(data.userId, data.role);
    redirect("/");
    return { message: "Succesful insert." };
  }
}
