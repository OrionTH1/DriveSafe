import { Models } from "node-appwrite";
import {
  CreateServiceParams,
  Gender,
  MonthlyIncome,
  VehicleFuelType,
  VehicleHowWasAcquired,
  VehicleUseFrequency,
} from ".";

export interface User extends Models.Document {
  userId: string;

  name: string;
  email: string;
  password: string;
  birthDate: string;
  gender: Gender;
  address: string;
  occupation: string;
  monthlyIncome: MonthlyIncome;
  phoneNumber: string;

  // Vehicle informations
  vehicleMakeModelYear: string;
  vehicleIdentificationNumber: string;
  vehicleLicensePlateNumber: string;
  vehicleColor: string;
  vehicleCurrentMileage: string;
  vehicleFuelType: VehicleFuelType;
  vehicleHowWasAcquired: VehicleHowWasAcquired;
  vehicleUseFrequency: VehicleUseFrequency;
  vehiclePreviousAccidentsOrDamage?: string;

  // Driver's License
  driverLicenseNumber: string;
  driverLicenseExpirationDate: string;
  driverLicenseEverBeenSuspended: boolean;
  driverLicensePreviousViolations?: string;

  driverLicenseDocumentId: string;
  driverLicenseDocumentUrl: string;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}
export interface Service extends CreateServiceParams, Models.Document {
  userId: string;
  userName: string;
}
