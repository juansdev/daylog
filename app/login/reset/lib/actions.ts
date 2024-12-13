'use server';

import { PrismaClient } from '@prisma/client';
import { FormState, ResetFormSchema } from './definitions';

import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const prisma = new PrismaClient();

export default async function reset(state: FormState, formData: FormData) {
  const result = ResetFormSchema.safeParse({
    email: formData.get('email'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const record = await prisma.user.findFirst({
      where: { email: result.data.email },
      select: { id: true, email: true },
    });

    if (!record) {
      return {
        message: 'This email is no registered.',
      };
    }

    const newPassword = '123123#';
    await prisma.user.update({
      where: { id: record.id },
      data: { password: newPassword },
    });

    const options = new SMTPTransport({
      host: process.env.SMTP_SERVER_HOST,
      port: Number(process.env.SMTP_SERVER_PORT),
      auth: {
        user: process.env.SMTP_SERVER_USER,
        pass: process.env.SMTP_SERVER_PASS,
      },
    });

    const transporter = nodemailer.createTransport(options);
    const info = await transporter.sendMail({
      from: `"daylog accounts" <${process.env.SMTP_SERVER_USER}>`,
      to: record.email,
      subject: 'Account password reset',
      text: `Your account password has been reset, use ${newPassword} to login. Remember to change your password in profile section.`,
    });
    return {
      success: info.messageId ? true : false,
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'An error occurred while reseting your account.',
    };
  }
}
