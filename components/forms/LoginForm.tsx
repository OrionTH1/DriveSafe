"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Form, FormMessage } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import OtpModal from "../OtpModal";
import { authAccount } from "@/lib/actions/auth.actions";

function LoginForm() {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [user, setUser] = useState<{
    userId: string;
    email: string;
    name: string;
  }>();

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      // const user = await verifyIfUserExists(name, email, phone);
      // const account = await createAccount(email, password, "Account");
      const account = await authAccount(email, password);

      if (account.error === "user_invalid_credentials") {
        form.setError("root", {
          message: "Invalid credentials. Please check the email and password.",
          type: "custom",
        });
        return;
      }

      if (account.data) {
        form.clearErrors();

        // Login
        setUser(account.data);
        setOtp(true);
        return;
      }
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
    <>
      {otp && user && (
        <OtpModal email={user.email} name={user.name} userId={user.userId} />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">
              Get Started with your Car insurance.
            </p>
          </section>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Passsword"
            placeholder="********"
            iconSrc="/assets/icons/lock.svg"
            iconAlt="password"
          />

          {errors && (
            <FormMessage className="shad-error">
              {errors.root?.message}
            </FormMessage>
          )}
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
