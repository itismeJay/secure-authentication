"use client";

import { Check, X } from "lucide-react";
import {
  getPasswordRequirements,
  getPasswordStrength,
  type PasswordStrength,
} from "@/lib/password-strength";
import { cn } from "@/lib/utils";

const strengthStyles: Record<PasswordStrength, string> = {
  Weak: "bg-red-500 text-white",
  Medium: "bg-yellow-400 text-black",
  Strong: "bg-emerald-400 text-black",
};

const strengthWidths: Record<PasswordStrength, string> = {
  Weak: "w-1/3",
  Medium: "w-2/3",
  Strong: "w-full",
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  const requirements = getPasswordRequirements(password);

  return (
    <div className="rounded-md border border-emerald-500/20 bg-black/30 p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-medium text-sm text-zinc-200">
          Password strength
        </span>
        <span
          className={cn(
            "rounded px-2 py-1 font-semibold text-xs",
            strengthStyles[strength]
          )}
        >
          {strength}
        </span>
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            strengthStyles[strength],
            strengthWidths[strength]
          )}
        />
      </div>
      <div className="grid gap-2 text-sm">
        {requirements.map((requirement) => (
          <div
            className={cn(
              "flex items-center gap-2",
              requirement.met ? "text-emerald-300" : "text-zinc-500"
            )}
            key={requirement.id}
          >
            {requirement.met ? (
              <Check className="size-4" />
            ) : (
              <X className="size-4" />
            )}
            <span>{requirement.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
