"use server";

import { ID, Query } from "node-appwrite";
import {
  SERVICES_COLLECTION_ID,
  database,
  DATABASE_ID,
} from "../appwrite.config";
import { revalidatePath } from "next/cache";
import type { CreateServiceParams, UpdateServiceParams } from "@/types";
import { getUser } from "./user.actions";
import { verifySession } from "../session";
import type { Service } from "@/types/appwrite.types";

export const createService = async (service: CreateServiceParams) => {
  const session = await verifySession();
  try {
    if (!session.isAuth) throw new Error("Session is invalid");
    const user = await getUser(session.userId);
    if (!user.data) throw new Error("User doesn't exists");
    const newService = await database.createDocument(
      DATABASE_ID!,
      SERVICES_COLLECTION_ID!,
      ID.unique(),
      {
        ...service,
        userName: user.data.name,
        userId: user.data.userId,
      }
    );

    return newService;
  } catch (error) {
    console.error("An error occurred while creating the service: ", error);
  }
};

export const getServiceByUserId = async (userId: string) => {
  try {
    const services = await database.listDocuments(
      DATABASE_ID!,
      SERVICES_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      canceledCount: 0,
    };

    const counts = (services.documents as Service[]).reduce((acc, service) => {
      switch (service.status) {
        case "approved":
          acc.scheduleCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "canceled":
          acc.canceledCount++;
          break;
      }

      return acc;
    }, initialCounts);

    const data = {
      totalCount: services.total,
      ...counts,
      documents: services.documents,
    };

    return data;
  } catch (error) {
    console.error("An error occurred while trying to get a service: ", error);
  }
};

export const getRecentServiceList = async () => {
  try {
    const services = await database.listDocuments(
      DATABASE_ID!,
      SERVICES_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      canceledCount: 0,
    };

    const counts = (services.documents as Service[]).reduce((acc, service) => {
      switch (service.status) {
        case "approved":
          acc.scheduleCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "canceled":
          acc.canceledCount++;
          break;
      }

      return acc;
    }, initialCounts);

    const data = {
      totalCount: services.total,
      ...counts,
      documents: services.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while trying to get the recent services list: ",
      error
    );
  }
};

export const updateService = async ({
  service,
  status,
  note,
}: UpdateServiceParams) => {
  try {
    const updatedService = await database.updateDocument(
      DATABASE_ID!,
      SERVICES_COLLECTION_ID!,
      service.$id,
      {
        status,
        note,
      }
    );

    if (!updatedService) {
      throw new Error("Service not found");
    }

    revalidatePath("/admin");
    revalidatePath("/");
    return updatedService as Service;
  } catch (error) {
    console.error(
      "An error occurred while trying to update the service:",
      error
    );
  }
};
