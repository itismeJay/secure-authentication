import { pbkdf2, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const pbkdf2Async = promisify(pbkdf2);
const HASH_ITERATIONS = 310_000;
const HASH_KEY_LENGTH = 32;
const HASH_DIGEST = "sha256";
const SALT_BYTES = 16;

const getPepper = () => {
  const pepper = process.env.PASSWORD_PEPPER;

  if (!pepper) {
    throw new Error("PASSWORD_PEPPER is missing from the environment.");
  }

  return pepper;
};

export const generateSalt = () => randomBytes(SALT_BYTES).toString("hex");

export const hashPassword = async (password: string, salt: string) => {
  const pepper = getPepper();
  const hashInput = `${password}${salt}${pepper}`;
  const derivedKey = await pbkdf2Async(
    hashInput,
    salt,
    HASH_ITERATIONS,
    HASH_KEY_LENGTH,
    HASH_DIGEST
  );

  return derivedKey.toString("hex");
};

export const verifyPassword = async (
  password: string,
  salt: string,
  storedHash: string
) => {
  const generatedHash = await hashPassword(password, salt);
  const generatedBuffer = Buffer.from(generatedHash, "hex");
  const storedBuffer = Buffer.from(storedHash, "hex");

  if (generatedBuffer.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(generatedBuffer, storedBuffer);
};

export const passwordHashDescription =
  "PBKDF2 with SHA-256, 310,000 iterations, unique random salt, and an environment-only pepper.";
