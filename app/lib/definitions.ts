/*
    The purpose of this file is to define types to ensure type safety, and also validate forms.
*/

import * as z from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Must contain at least one letter." })
    .regex(/[0-9]{2,}/, { error: "Must contain at least two numbers" }) // The {2,} is how we require there to be at least 2 numbers
    .regex(/[^a-zA-Z0-9]/, { error: "Must contain at least one special char" }) // Basically states everything that isn't a number or part of the alphabet is valid
    .trim(),
});

/*
The | is basically saying the type of the form will either optional errors/optional message
or undefined. The errors part itself is for field-level validation problems, and because each field
can have multiple errors we must store it as a string array. The ? is basically just saying the property
is optional, meaning its not required.
*/
export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
