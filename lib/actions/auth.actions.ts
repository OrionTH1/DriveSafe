"use server";

import { database, DATABASE_ID, USERS_COLLECTION_ID } from "../appwrite.config";
import { createSession, deleteSession } from "../session";
import { Query } from "node-appwrite";
import { comparePassword } from "./user.actions";
import { User } from "@/types/appwrite.types";
import { ReturnedUser } from "@/types";

export const authAccount: (
  email: string,
  password: string
) => Promise<ReturnedUser> = async (email: string, password: string) => {
  try {
    const user = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      [Query.equal("email", email)]
    );

    if (!user) {
      return {
        data: null,
        error: "user_invalid_credentials",
      };
    }

    const foundUser = user.documents[0] as User;
    const isPasswordEqual = await comparePassword(password, foundUser.password);

    if (!isPasswordEqual) {
      return {
        data: null,
        error: "user_invalid_credentials",
      };
    }

    return {
      data: {
        email: foundUser.email,
        userId: foundUser.userId,
        name: foundUser.name,
      },
      error: null,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("An error occurred while trying to auth the account:", error);
    if (error.type === "user_invalid_credentials") {
      return {
        data: null,
        error: "user_invalid_credentials",
      };
    }

    return {
      data: null,
      error: "",
    };
  }
};

export const loginIn = async (userId: string) => {
  try {
    await createSession(userId);
    return { success: true };
  } catch (error) {
    console.error("Error trying to login:", error);
    return { success: false };
  }
};

export const logout = async () => {
  try {
    await deleteSession();
    return { success: true };
  } catch (error) {
    console.error("Error trying to logout:", error);
    return { success: false };
  }
};
