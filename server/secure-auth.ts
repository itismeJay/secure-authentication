"use server";

import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { secureUser } from "@/db/schema";
import {
  generateSalt,
  hashPassword,
  verifyPassword,
} from "@/lib/password-security";
import { isStrongPassword } from "@/lib/password-strength";

export interface AuthActionResult {
  success: boolean;
  message: string;
}

export const registerSecureUser = async (
  username: string,
  password: string,
  confirmPassword: string
): Promise<AuthActionResult> => {
  const cleanUsername = username.trim();

  if (cleanUsername.length < 3) {
    return {
      success: false,
      message: "Username must be at least 3 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Password and confirm password do not match.",
    };
  }

  if (!isStrongPassword(password)) {
    return {
      success: false,
      message: "Password must be strong before registration is allowed.",
    };
  }

  const existingUser = await db.query.secureUser.findFirst({
    where: eq(secureUser.username, cleanUsername),
  });

  if (existingUser) {
    return {
      success: false,
      message: "Username is already registered.",
    };
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  await db.insert(secureUser).values({
    id: randomUUID(),
    username: cleanUsername,
    passwordHash,
    salt,
  });

  return {
    success: true,
    message:
      "Registration successful. Password hash and salt were stored securely.",
  };
};

export const loginSecureUser = async (
  username: string,
  password: string
): Promise<AuthActionResult> => {
  const cleanUsername = username.trim();
  const existingUser = await db.query.secureUser.findFirst({
    where: eq(secureUser.username, cleanUsername),
  });

  if (!existingUser) {
    return {
      success: false,
      message: "Invalid username or password.",
    };
  }

  const isValidPassword = await verifyPassword(
    password,
    existingUser.salt,
    existingUser.passwordHash
  );

  if (!isValidPassword) {
    return {
      success: false,
      message: "Invalid username or password.",
    };
  }

  return {
    success: true,
    message: "Login Successful",
  };
};
