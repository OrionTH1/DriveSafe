"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Form, FormControl, FormMessage } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  GenderOptionsEnum,
  MonthlyIncomeEnum,
  VehicleFuelTypeEnum,
  VehicleHowWasAcquiredEnum,
  VehicleUseFrequencyEnum,
  YesOrNoEnum,
  getPatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";
import { RegisterFormValidation } from "@/lib/validation";
import { ID } from "node-appwrite";
import { registerUser } from "@/lib/actions/user.actions";
import type { CreateUserParams } from "@/types";
import { loginIn } from "@/lib/actions/auth.actions";
import type { User } from "@/types/appwrite.types";
import Image from "next/image";

function RegisterForm({
  user,
  documentUrl,
}: {
  user?: User;
  documentUrl?: string;
}) {
  const router = useRouter();
  const patientFormDefaultValues = getPatientFormDefaultValues(user);
  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: { ...patientFormDefaultValues },
  });
  const {
    formState: { errors },
  } = form;
  const isReadOnly = user ? true : false;

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    setIsLoading(true);
    form.clearErrors();

    let formData;

    if (
      values.driverLicenseDocument &&
      values.driverLicenseDocument.length > 0
    ) {
      const identificationDoc = values.driverLicenseDocument[0];
      const blobFile = new Blob([identificationDoc], {
        type: identificationDoc.type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", identificationDoc.name);
    }
    if (!formData) return;

    try {
      const patientData = {
        ...values,
        driverLicenseEverBeenSuspended:
          values.driverLicenseEverBeenSuspended === "Yes" ? true : false,
        userId: ID.unique(),
        birthDate: new Date(values.birthDate),
        driverLicenseDocument: formData,
      } as CreateUserParams;

      const user = await registerUser(patientData);

      if (user.data) {
        await loginIn(user.data.userId);
        router.push("/");
      }
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    form.setError("root", {
      message: "Something went wrong, please try again",
      type: "custom",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          readOnly={isReadOnly}
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            readOnly={isReadOnly}
          />
          {!user && (
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Passsword"
              placeholder="********"
              iconSrc="/assets/icons/lock.svg"
              iconAlt="password"
              readOnly={isReadOnly}
            />
          )}
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            readOnly={isReadOnly}
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isReadOnly}
                >
                  {GenderOptionsEnum.options.map((option) => (
                    <Label key={option} className="radio-group cursor-pointer">
                      <RadioGroupItem value={option} id={option} />
                      {option}
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            readOnly={isReadOnly}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="18th Street, San diego"
            readOnly={isReadOnly}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Bartender"
            readOnly={isReadOnly}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="monthlyIncome"
            label="Monthly income"
            placeholder="Select your monthly income:"
            readOnly={isReadOnly}
          >
            {MonthlyIncomeEnum.options.map((monthlyIncome) => (
              <SelectItem
                key={monthlyIncome}
                value={monthlyIncome}
                className="hover:bg-dark-500 transition duration-500 cursor-pointer"
              >
                <p>{monthlyIncome}</p>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="(555) 123-4567"
            readOnly={isReadOnly}
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Vehicle Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="vehicleMakeModelYear"
            label="Make, Model & Year"
            placeholder="ex: Land Cruiser Toyota 2024"
            readOnly={isReadOnly}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="vehicleIdentificationNumber"
            label="Vehicle Identification Number"
            placeholder="ABC12345689"
            readOnly={isReadOnly}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="vehicleLicensePlateNumber"
            label="License Plate Number"
            placeholder="ex: A12-BCD"
            readOnly={isReadOnly}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="vehicleColor"
            label="Vehicle Color"
            placeholder="ex: Blue"
            readOnly={isReadOnly}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="vehicleCurrentMileage"
            label="Odometer Reading (Current Mileage)"
            placeholder="ex: 2000KM"
            readOnly={isReadOnly}
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="vehicleFuelType"
            label="Fuel Type"
            placeholder="Select the car fuel type:"
            readOnly={isReadOnly}
          >
            {VehicleFuelTypeEnum.options.map((fuelType) => (
              <SelectItem
                key={fuelType}
                value={fuelType}
                className="hover:bg-dark-500 transition duration-500 cursor-pointer"
              >
                <p>{fuelType}</p>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="vehicleHowWasAcquired"
            label="Do you own, lease, or finance the vehicle?"
            placeholder="Select which the situation is:"
            readOnly={isReadOnly}
          >
            {VehicleHowWasAcquiredEnum.options.map((howWasAcquired) => (
              <SelectItem
                key={howWasAcquired}
                value={howWasAcquired}
                className="hover:bg-dark-500 transition duration-500 cursor-pointer"
              >
                <p>{howWasAcquired}</p>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="vehicleUseFrequency"
            label="Frequency of Vehicle Use"
            placeholder="Select your frequency of vehicle use:"
            readOnly={isReadOnly}
          >
            {VehicleUseFrequencyEnum.options.map((howWasAcquired) => (
              <SelectItem
                key={howWasAcquired}
                value={howWasAcquired}
                className="hover:bg-dark-500 transition duration-500 cursor-pointer"
              >
                <p>{howWasAcquired}</p>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="vehiclePreviousAccidentsOrDamage"
            label="Previous Accidents or Damage"
            placeholder={
              !isReadOnly
                ? "ex: My vehicle has been involved in one incidents.  In February 2022, where I was stopped at a red light, and another car hit me from behind."
                : ""
            }
            readOnly={isReadOnly}
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="driverLicenseNumber"
          label="Driver's License Number"
          placeholder="ex: 123 456 789"
          readOnly={isReadOnly}
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="driverLicenseExpirationDate"
            label="Driver's License Expiration Date"
            readOnly={isReadOnly}
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="driverLicenseEverBeenSuspended"
            label="Has your Driver's License ever been suspended or revoked"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isReadOnly}
                >
                  {YesOrNoEnum.options.map((option) => (
                    <Label key={option} className="radio-group cursor-pointer">
                      <RadioGroupItem value={option} id={option} />
                      {option}
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            readOnly={isReadOnly}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="driverLicensePreviousViolations"
          label="Have you ever had any traffic violations or infractions? (Violation Type, Date of Violation and etc)"
          placeholder={
            !isReadOnly
              ? "ex: Yes, I have had a few minor violations. The most recent was a speeding ticket in May 2023 and a failure to yield in September 2022."
              : ""
          }
          readOnly={isReadOnly}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="driverLicenseDocument"
          label="Scanned Copy of Driver's License"
          renderSkeleton={(field) => (
            <FormControl className="file-upload">
              {documentUrl ? (
                <div className="file-upload_label">
                  <Image
                    src={`${documentUrl}`}
                    width={250}
                    height={250}
                    alt="Document copy"
                    unoptimized
                    className="md:max-w-56"
                  />
                </div>
              ) : (
                <FileUploader files={field.value} onChange={field.onChange} />
              )}
            </FormControl>
          )}
          readOnly={isReadOnly}
        />

        {!isReadOnly && (
          <>
            <section className="space-y-6">
              <div className="mb-9 space-y-1">
                <h2 className="sub-header">Consent and privacy</h2>
              </div>
            </section>

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label="I agree to the use and disclosure of my information to evaluate my eligibility for car insurance."
              readOnly={isReadOnly}
            />

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label="I consent to privacy policy"
              readOnly={isReadOnly}
            />
            {errors && (
              <FormMessage className="shad-error">
                {errors.root?.message}
              </FormMessage>
            )}
            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
          </>
        )}
      </form>
    </Form>
  );
}

export default RegisterForm;
