import { SignupFormSchema, FormState } from "@/app/lib/definitions";

export async function signup(state: FormState, formData: FormData) {
  // Validate the form fields received from user submission
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Returns early if any fields do not match, which stops us from invoking the server and wasting resources.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
