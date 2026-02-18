// File for keeping track of users session
import "server-only";
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
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
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
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
