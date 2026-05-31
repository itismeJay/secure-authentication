import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium text-white"
          href="/"
        >
          <div className="flex size-8 items-center justify-center rounded-md bg-emerald-400 text-black">
            <ShieldCheck className="size-5" />
          </div>
          Secure Auth System
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
