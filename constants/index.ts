import {
  Gender,
  MonthlyIncome,
  VehicleFuelType,
  VehicleHowWasAcquired,
  VehicleUseFrequency,
  YesOrNo,
} from "@/types";
import { User } from "@/types/appwrite.types";
import { z } from "zod";

export function getPatientFormDefaultValues(
  user?: User,
  documentFile?: File[]
) {
  console.log(documentFile);

  return {
    birthDate: new Date(Date.now()),

    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    gender: user ? user.gender : ("Male" as Gender),
    address: user ? user.address : "",
    occupation: user ? user.occupation : "",
    monthlyIncome: user
      ? user.monthlyIncome
      : ("US$ 1.000 - US$ 2.000" as MonthlyIncome),
    phoneNumber: user ? user.phoneNumber : "",

    // Vehicle informations
    vehicleMakeModelYear: user ? user.vehicleMakeModelYear : "",
    vehicleIdentificationNumber: user ? user.vehicleIdentificationNumber : "",
    vehicleLicensePlateNumber: user ? user.vehicleLicensePlateNumber : "",
    vehicleColor: user ? user.vehicleColor : "",
    vehicleCurrentMileage: user ? user.vehicleCurrentMileage : "",
    vehicleFuelType: user
      ? user.vehicleFuelType
      : ("Gasoline" as VehicleFuelType),
    vehicleHowWasAcquired: user
      ? user.vehicleHowWasAcquired
      : ("I'm financing the vehicle." as VehicleHowWasAcquired),
    vehicleUseFrequency: user
      ? user.vehicleUseFrequency
      : ("Daily" as VehicleUseFrequency),
    vehiclePreviousAccidentsOrDamage: user
      ? (user.vehiclePreviousAccidentsOrDamage as YesOrNo)
      : "",

    // Driver's License
    driverLicenseNumber: user ? user.driverLicenseNumber : "",
    driverLicenseExpirationDate: user
      ? new Date(user.driverLicenseExpirationDate)
      : new Date(Date.now()),
    driverLicenseEverBeenSuspended: user
      ? user.driverLicenseEverBeenSuspended
        ? "Yes"
        : "No"
      : ("No" as YesOrNo),
    driverLicensePreviousViolations: user
      ? user.driverLicensePreviousViolations
      : "",

    driverLicenseDocument: [] as File[],
    disclosureConsent: false,
    privacyConsent: false,
  };
}

export const GenderOptionsEnum = z.enum(["Male", "Female", "Other"], {
  message: "Select a gender",
});

export const MonthlyIncomeEnum = z.enum(
  [
    "US$ 0 - US$ 1.000",
    "US$ 1.000 - US$ 2.000",
    "US$ 2.000 - US$ 3.000",
    "US$ 3.000 - Other",
  ],
  {
    message: "Select your Monthly Income",
  }
);

export const VehicleFuelTypeEnum = z.enum(
  ["Gasoline", "Ethanol", "Diesel", "Eletric", "Other"],
  {
    message: "Select the vehicle fuel type",
  }
);

export const VehicleHowWasAcquiredEnum = z.enum(
  [
    "I own the vehicle outright.",
    "I lease the vehicle.",
    "I'm financing the vehicle.",
  ],
  {
    message: "Provide what the vehicle's situation is",
  }
);

export const VehicleUseFrequencyEnum = z.enum([
  "Daily",
  "Several times a week",
  "Weekly",
  "Monthly",
  "Occasional/Only on weekends",
]);

export const YesOrNoEnum = z.enum(["Yes", "No"]);

export const Services = ["Rent a car"];

export const StatusIcon = {
  approved: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  canceled: "/assets/icons/cancelled.svg",
};
