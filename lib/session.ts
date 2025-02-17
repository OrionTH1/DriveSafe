"use server";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: JWTPayload) => {
  try {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
  } catch (error) {
    console.error("Failed to encrypt the session", error);
  }
};

export const decrypt = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to decrypt the session", error);
  }
};

export const createSession = async (userId: string) => {
  try {
    const expiresAt = new Date(Date.now() * 7 * 24 * 60 * 60 * 1000);

    const session = await encrypt({ userId, expiresAt });
    if (!session)
      throw new Error("Session returned from (encrypt function) is undefined");

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: false,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.error("Failed to save the session", error);
  }
};

export const deleteSession = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  } catch (error) {
    console.error("Failed to delete the session", error);
  }
};

type VerifySessionFunc = () => Promise<
  | {
      isAuth: true;
      userId: string;
    }
  | {
      isAuth: false;
      userId: null;
    }
>;
export const verifySession: VerifySessionFunc = async () => {
  try {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) return { isAuth: false, userId: null };
    const session = await decrypt(sessionCookie);

    if (!session?.userId) {
      return { isAuth: false, userId: null };
    }

    return { isAuth: true, userId: session.userId as string };
  } catch (error) {
    console.error("Failed to verify the session", error);
    return { isAuth: false, userId: null };
  }
};
