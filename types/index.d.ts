import {
  VehicleUseFrequencyEnum,
  GenderOptionsEnum,
  MonthlyIncomeEnum,
  VehicleFuelTypeEnum,
  VehicleHowWasAcquiredEnum,
  YesOrNoEnum,
} from "@/constants";
import { z } from "zod";
import { Service } from "./appwrite.types";

declare type SearchParamProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

declare type Gender = z.infer<typeof GenderOptionsEnum>;

declare type YesOrNo = z.infer<typeof YesOrNoEnum>;

declare type MonthlyIncome = z.infer<typeof MonthlyIncomeEnum>;

declare type VehicleFuelType = z.infer<typeof VehicleFuelTypeEnum>;

declare type VehicleUseFrequency = z.infer<typeof VehicleUseFrequencyEnum>;

declare type VehicleHowWasAcquired = z.infer<typeof VehicleHowWasAcquiredEnum>;

declare type Status = "pending" | "approved" | "canceled";

declare type ReturnedUser =
  | {
      data: { userId: string; email: string; name: string };
      error: null;
    }
  | {
      data: null;
      error: string;
    };

declare interface CreateUserParams {
  userId: string;
  name: string;
  email: string;
  password: string;
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  phoneNumber: string;
  monthlyIncome: MonthlyIncome;
  vehicleMakeModelYear: string;
  vehicleIdentificationNumber: string;
  vehicleUseFrequency: VehicleUseFrequency;
  vehicleCurrentMileage: stirng;
  vehicleLicensePlateNumber: string;
  vehicleColor: string;
  vehicleFuelType: VehicleFuelType;
  vehicleHowWasAcquired: VehicleHowWasAcquired;
  vehiclePreviousAccidentsOrDamage?: string;
  driverLicenseNumber: string;
  driverLicenseExpirationDate: Date;
  driverLicensePreviousViolations?: string;
  driverLicenseEverBeenSuspended: boolean;
  driverLicenseDocument: FormData;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}
declare interface User extends CreateUserParams {
  token: string;
}

declare type CreateServiceParams = {
  serviceName: string;
  reason: string;
  status: Status;
  note?: string;
  reasonForCancellation?: string;
};

declare type UpdateServiceParams = {
  service: Service;
  type: string;
  note: string;
};
