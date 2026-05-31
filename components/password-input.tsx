"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PasswordInputProps = React.ComponentProps<typeof Input>;

export function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        className="pr-10"
        type={isVisible ? "text" : "password"}
      />
      <Button
        aria-label={isVisible ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-1 size-7 -translate-y-1/2 text-zinc-400 hover:text-emerald-300"
        onClick={() => setIsVisible((current) => !current)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    </div>
  );
}
