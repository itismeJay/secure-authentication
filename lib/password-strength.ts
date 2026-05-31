export type PasswordStrength = "Weak" | "Medium" | "Strong";

export interface PasswordRequirement {
  id: "lowercase" | "uppercase" | "digit" | "symbol" | "length";
  label: string;
  met: boolean;
}

const LOWERCASE_REGEX = /[a-z]/;
const UPPERCASE_REGEX = /[A-Z]/;
const DIGIT_REGEX = /\d/;
const SYMBOL_REGEX = /[^A-Za-z0-9]/;

export const getPasswordRequirements = (
  password: string
): PasswordRequirement[] => [
  {
    id: "lowercase",
    label: "At least one lowercase letter",
    met: LOWERCASE_REGEX.test(password),
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    met: UPPERCASE_REGEX.test(password),
  },
  {
    id: "digit",
    label: "At least one number",
    met: DIGIT_REGEX.test(password),
  },
  {
    id: "symbol",
    label: "At least one special character",
    met: SYMBOL_REGEX.test(password),
  },
  {
    id: "length",
    label: "At least 12 characters",
    met: password.length >= 12,
  },
];

export const getPasswordStrength = (password: string): PasswordStrength => {
  const metCount = getPasswordRequirements(password).filter(
    (requirement) => requirement.met
  ).length;

  if (metCount === 5) {
    return "Strong";
  }

  if (metCount >= 3) {
    return "Medium";
  }

  return "Weak";
};

export const isStrongPassword = (password: string) =>
  getPasswordStrength(password) === "Strong";
