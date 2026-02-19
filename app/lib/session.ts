// File for keeping track of users session
"use server";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/*
This function first takes in our payload for our JWT (JSON Web Token). 
We then call SignJWT from the jose library, this basically creates a signature over the payload.
Its basically letting us know that this token was never modified. It also gives the token and 
expiration data, then we also sign it with our secret key.
*/
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/*
This function is used to decrypt the users session. It first attempts to verify the session,
it does this by passing the session and our encodedKey(secretKey) to a jose function. If this
is successful than we return the payload, otherwise we error out.
*/
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

// Creates the users actual session, the session is an encryption of the users id and the expirary date of the token.
export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt, role });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true, // Prevents client side JS from accessing the cookie
    secure: true, // Uses https to send the cookie
    expires: expiresAt,
    sameSite: "lax", // Specifies whether the cookie can be sent with crosss-site requests, in this case yes due to lax.
    path: "/", // Defines the URL path for the cookie
  });
}

// Function used to update or refresh a users session. Useful for say extending the users session after re-access of the application.
export async function updateSession() {
  const session = (await cookies()).get("session")?.value; // Grabs the users cookies
  const payload = await decrypt(session); // Attempts to get the users payload via decrypting the current session.

  if (!session || !payload) {
    return null;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Updates the users cookies.
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// Deletes the users session from cookies.
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Basically just deletes the users session as a logout, but also redirects to the home page.
export async function logout() {
  await deleteSession();
  redirect("/");
}
