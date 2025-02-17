import {
  GenderOptionsEnum,
  MonthlyIncomeEnum,
  VehicleFuelTypeEnum,
  VehicleHowWasAcquiredEnum,
  VehicleUseFrequencyEnum,
} from "@/constants";
import { z } from "zod";

export const UserFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "The password lenght be at least 8 characters"),
});

const eightenYearsAgo = new Date();
eightenYearsAgo.setFullYear(new Date().getFullYear() - 10);
export const RegisterFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "The password lenght be at least 8 characters")
    .max(100, "The password length be at most 100 characters"),
  birthDate: z.coerce.date().refine((date) => date <= eightenYearsAgo, {
    message: "You must be at least 18 years old.",
  }),
  gender: GenderOptionsEnum,
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(100, "Occupation must be at most 500 characters"),
  monthlyIncome: MonthlyIncomeEnum,
  phoneNumber: z
    .string()
    .refine(
      (phoneNumber) => /^\+\d{10,15}$/.test(phoneNumber),
      "Invalid phone number"
    ),

  // Vehicle informations
  vehicleMakeModelYear: z
    .string()
    .min(6, "Car Make, Model & Year is required")
    .max(30, "Car Make, Model & Year must be at most 30 characters"),

  vehicleIdentificationNumber: z
    .string()
    .min(2, "Vehicle Identification Number must be at least 15 characters")
    .max(30, "Vehicle Identification Number must be at most 30 characters"),

  vehicleLicensePlateNumber: z
    .string()
    .min(6, "License Plate Number must be at least 6 characters")
    .max(30, "Vehicle Identification Number must be at most 30 characters"),
  vehicleColor: z
    .string()
    .min(6, "Vehicle color is required")
    .max(30, "Vehicle color must be at most 30 characters"),
  vehicleCurrentMileage: z
    .string()
    .min(2, "Vehicle current mileage is required")
    .max(30, "Vehicle current mileage must be at most 30 characters"),
  vehicleFuelType: VehicleFuelTypeEnum,

  vehicleHowWasAcquired: VehicleHowWasAcquiredEnum,
  vehicleUseFrequency: VehicleUseFrequencyEnum,
  vehiclePreviousAccidentsOrDamage: z
    .string()
    .max(1000, "This text length must be at most 1000 characters"),

  // Driver's License

  driverLicenseNumber: z
    .string()
    .min(2, "Driver's license number must be at least 9")
    .max(30, "Driver's license number must be at most 30 characters"),

  driverLicenseExpirationDate: z.coerce
    .date()
    .refine(
      (date) => date >= new Date(Date.now() - 24 * 60 * 60 * 1000),
      "Your driver's license has expired, you cannot proceed"
    ),
  driverLicenseEverBeenSuspended: z.enum(["Yes", "No"], {
    message: "Select a choice",
  }),
  driverLicensePreviousViolations: z
    .string()
    .max(1000, "This text length must be at most 1000 characters"),

  driverLicenseDocument: z.custom<File[]>().refine(
    (file) => {
      return file.length > 0;
    },
    {
      message: "You must provide your driver's license",
    }
  ),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateServiceSchema = z.object({
  serviceName: z.string().min(2, "Select at least one doctor"),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().min(0).max(500, "Note must be at most 500 characters"),
  cancelationReason: z
    .string()
    .min(0, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export const ScheduleAppointmentSchema = z.object({
  serviceName: z.string().min(0, "Select at least one doctor"),
  reason: z
    .string()
    .min(0, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z
    .string()
    .min(10, "Note must be at least 10 characters")
    .max(500, "Note must be at most 500 characters"),
  cancelationReason: z
    .string()
    .min(0, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export const CancelAppointmentSchema = z.object({
  serviceName: z.string().min(0, "Select at least one doctor"),
  note: z
    .string()
    .min(10, "Note must be at least 10 characters")
    .max(500, "Note must be at most 500 characters"),
  reason: z
    .string()
    .min(0, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  cancelationReason: z
    .string()
    .min(0, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getServiceSchema(type: string) {
  switch (type) {
    case "create":
      return CreateServiceSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
