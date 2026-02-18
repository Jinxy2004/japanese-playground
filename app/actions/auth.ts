import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { supabase } from "../lib/supabaseClient";

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

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, email, password }])
    .select()
    .single();
  if (error) {
    return { message: error.message };
  } else if (!data[0]) {
    return { message: "insert not successful." };
  }
}
