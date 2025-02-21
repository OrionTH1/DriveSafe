"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Form, FormMessage } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { type Dispatch, type SetStateAction, useState } from "react";
import { getServiceSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/lib/actions/service.actions";
import type { Status, UpdateServiceParams } from "@/types";
import type { Service } from "@/types/appwrite.types";
import { Services } from "@/constants";
import { SelectItem } from "../ui/select";
import { sendEmailWithServiceStats } from "@/lib/actions/email.actions";
import { getUser } from "@/lib/actions/user.actions";

interface ServiceFormProps {
  type: "create" | "cancel" | "approve";
  service?: Service;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
function ServiceForm({ type, service, setOpen }: ServiceFormProps) {
  const router = useRouter();
  const serviceFormValidation = getServiceSchema(type);
  const form = useForm<z.infer<typeof serviceFormValidation>>({
    resolver: zodResolver(serviceFormValidation),
    defaultValues: {
      note: "",
      cancelationReason: "",
      reason: "",
      serviceName: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit({
    serviceName,
    note,
    reason,
  }: z.infer<typeof serviceFormValidation>) {
    setIsLoading(true);
    let status: Status;
    switch (type) {
      case "approve":
        status = "approved";
        break;
      case "cancel":
        status = "canceled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create") {
        const serviceData = {
          serviceName,
          reason,
          note,
          status,
        };

        const newService = await createService(serviceData);

        if (!newService) {
          throw new Error("Error trying to register a new service");
        }
        form.reset();
        router.push(
          `/services/success?serviceName=${newService.serviceName}&serviceStatus=${newService.status}`
        );
      }

      // If Type is equal to "Cancel" ou "Schedule"
      else {
        if (!service) return;
        const serviceToUpdate = {
          service,
          status,
          note,
        } as UpdateServiceParams;

        const updatedService = await updateService(serviceToUpdate);
        if (!updatedService) {
          throw new Error("Error trying to register a new service");
        }

        if (updatedService) {
          if (setOpen) {
            const user = await getUser(updatedService.userId);
            if (user.data) {
              const { status, serviceName, note } = updatedService;
              sendEmailWithServiceStats(
                user.data.email,
                user.data.name,
                status,
                serviceName,
                note
              );
            }
            setOpen(false);
          }
          form.reset();
        }
      }
    } catch (error) {
      form.setError("root", {
        message: "Something went wrong, please try again",
        type: "custom",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel: string | undefined;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel service";
      break;

    case "create":
      buttonLabel = "Create service";
      break;

    case "approve":
      buttonLabel = "Schedule service";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <>
            <section className="mb-12 space-y-4">
              <h1 className="header">New service</h1>
              <p className="text-dark-700">Request a new service</p>
            </section>

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="serviceName"
              label="Service"
              placeholder="Select the service"
            >
              {Services.map((services) => (
                <SelectItem
                  key={services}
                  value={services}
                  className="hover:bg-dark-500 transition duration-500 cursor-pointer"
                >
                  <p>{services}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason"
                placeholder="ex: I need to a replacement car"
              />
            </div>
          </>
        )}
        {type === "approve" && (
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Note"
              placeholder="ex: Prefer a Audio 2025"
            />
          </div>
        )}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Reason for cancellation"
            placeholder="ex: The client doesn't have a good credit score"
          />
        )}
        {errors && (
          <FormMessage className="shad-error">
            {errors.root?.message}
          </FormMessage>
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
}

export default ServiceForm;
