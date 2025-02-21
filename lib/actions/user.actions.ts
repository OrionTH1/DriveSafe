"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  database,
  DATABASE_ID,
  ENDPOINT,
  PROJECT_ID,
  storage,
  USERS_COLLECTION_ID,
  users,
} from "../appwrite.config";
import { InputFile } from "node-appwrite/file";
import type { CreateUserParams, ReturnedUser } from "@/types";
import bcrypt from "bcryptjs";
import type { User } from "@/types/appwrite.types";

export const verifyIfUserExists = async (
  name: string,
  email: string,
  phone: string
) => {
  try {
    const query = [
      Query.equal("name", name),
      Query.equal("email", email),
      Query.equal("phone", phone),
    ];
    const user = await users.list(query);

    if (user.total > 0) return user.users[0];

    return null;
  } catch (error) {
    console.error("An error occurred while retrieving the user: ", error);
  }
};

export const registerUser: (
  user: CreateUserParams
) => Promise<ReturnedUser> = async ({ driverLicenseDocument, ...user }) => {
  try {
    let file;

    if (driverLicenseDocument) {
      const inputFile = InputFile.fromBuffer(
        driverLicenseDocument?.get("blobFile") as Blob,
        driverLicenseDocument?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    const passwordHashed = await hashPassword(user.password);

    const newUser = (await database.createDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      ID.unique(),
      {
        ...user,
        password: passwordHashed,
        driverLicenseDocumentId: file?.$id || null,
        driverLicenseDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      }
    )) as User;

    return {
      data: {
        email: newUser.email,
        userId: newUser.userId,
        name: newUser.name,
      },
      error: null,
    };
  } catch (error) {
    console.error("An error occurred while registering the user: ", error);
    return {
      data: null,
      error: "Failed to create the user",
    };
  }
};

export const getAllUserInformations = async (userId: string) => {
  try {
    const user = (
      await database.listDocuments(DATABASE_ID!, USERS_COLLECTION_ID!, [
        Query.equal("userId", [userId]),
      ])
    ).documents[0] as User;

    return {
      data: user,
      error: null,
    };
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details: ",
      error
    );
    return {
      data: null,
      error: "Failed, can't to get the User",
    };
  }
};

export const getUser: (userId: string) => Promise<ReturnedUser> = async (
  userId: string
) => {
  try {
    const user = (
      await database.listDocuments(DATABASE_ID!, USERS_COLLECTION_ID!, [
        Query.equal("userId", [userId]),
      ])
    ).documents[0] as User;

    return {
      data: { email: user.email, userId: user.userId, name: user.name },
      error: null,
    };
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details: ",
      error
    );
    return {
      data: null,
      error: "Failed, can't to get the User",
    };
  }
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  return await bcrypt.compare(password, hashPassword);
};
