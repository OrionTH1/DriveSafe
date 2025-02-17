"use server";

import { MailerSend, EmailParams, Recipient } from "mailersend";
const apiKey = process.env.EMAIL_API_KEY!;

const mailersend = new MailerSend({
  apiKey,
});

export const sendEmail = async (
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
