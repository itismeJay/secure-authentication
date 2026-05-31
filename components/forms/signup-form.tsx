"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "@/components/password-input";
import { PasswordStrengthMeter } from "@/components/password-strength-meter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isStrongPassword } from "@/lib/password-strength";
import { cn } from "@/lib/utils";
import { registerSecureUser } from "@/server/secure-auth";

const formSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters."),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters.")
      .refine(
        isStrongPassword,
        "Password must include uppercase, lowercase, number, and symbol."
      ),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { success, message } = await registerSecureUser(
      values.username,
      values.password,
      values.confirmPassword
    );

    if (success) {
      toast.success(message);
      form.reset();
    } else {
      toast.error(message);
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-emerald-500/20 bg-zinc-950/90 shadow-2xl shadow-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-white">
            <UserPlus className="size-5 text-emerald-400" />
            Registration Module
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Create a user with a strong password, random salt, and private
            pepper.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="student_user" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <PasswordInput
                                placeholder="Cyber@2026Secure"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <PasswordStrengthMeter password={password} />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <PasswordInput
                                placeholder="Retype password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full bg-emerald-400 text-black hover:bg-emerald-300"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Register Secure User"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm text-zinc-400">
                  Already have an account?{" "}
                  <Link
                    className="text-emerald-300 underline underline-offset-4"
                    href="/login"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-zinc-500">
        Database stores username, password hash, and salt. The pepper remains in
        the environment only.
      </div>
    </div>
  );
}
