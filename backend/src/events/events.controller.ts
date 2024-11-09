import dotenv from "dotenv";

dotenv.config();

import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";

export const sendReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventName, eventDate, eventTime } = req.body;
    console.log("Sending reminder for event:", eventName, eventDate, eventTime);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "patil.20233209@mnnit.ac.in",
      subject: `Reminder for Event: ${eventName}`,
      text: `Event: ${eventName}\nDate: ${eventDate}\nTime: ${eventTime}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    res.status(200).json({ message: "Reminder sent successfully!" });
  } catch (error) {
    console.error("Error in sendReminder:", error);

    next(error);
  }
};
