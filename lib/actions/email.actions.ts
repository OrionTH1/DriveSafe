"use server";

import type { Status } from "@/types";
import { MailerSend, EmailParams, Recipient } from "mailersend";
const apiKey = process.env.EMAIL_API_KEY!;

const mailersend = new MailerSend({
  apiKey,
});

export const sendEmailWithServiceStats = async (
  toEmail: string,
  name: string,
  status: Status,
  serviceName: string,
  note?: string
) => {
  const senders = [new Recipient(toEmail, name)];
  const variables = [
    {
      email: senders[0].email,
      data: {
        name,
        note: note || "",
        status,
        serviceName,
      },
    },
  ];

  const subject = `Your service has been ${status}!`;
  const emailParams = new EmailParams()

    .setFrom({
      email: "drivesafe@trial-7dnvo4dqqq3l5r86.mlsender.net",
      name: "DriveSafe",
    })
    .setSubject(subject)
    .setTemplateId("3yxj6lj5vq7gdo2r")
    .setTo(senders)
    .setPersonalization(variables);

  try {
    mailersend.email.send(emailParams);
  } catch (error) {
    console.error("An error occurred while trying to send email: ", error);
  }
};

export const sendEmailVerification = async (
  toEmail: string,
  name: string,
  code: string
) => {
  const senders = [new Recipient(toEmail, name)];
  const variables = [
    {
      email: senders[0].email,
      data: {
        code,
        name,
      },
    },
  ];

  const emailParams = new EmailParams()

    .setFrom({
      email: "drivesafe@trial-7dnvo4dqqq3l5r86.mlsender.net",
      name: "DriveSafe",
    })
    .setSubject("Email verification code")
    .setTemplateId("3zxk54v1n114jy6v")
    .setTo(senders)
    .setPersonalization(variables);

  try {
    mailersend.email.send(emailParams);
  } catch (error) {
    console.error("An error occurred while trying to send email: ", error);
  }
};
