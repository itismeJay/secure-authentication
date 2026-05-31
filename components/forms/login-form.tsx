"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "@/components/password-input";
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
import { cn } from "@/lib/utils";
import { loginSecureUser } from "@/server/secure-auth";

const formSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { success, message } = await loginSecureUser(
      values.username,
      values.password
    );

    if (success) {
      setResult("success");
      toast.success(message);
      router.push("/dashboard");
    } else {
      setResult("error");
      toast.error(message);
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-emerald-500/20 bg-zinc-950/90 shadow-2xl shadow-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-white">
            <LogIn className="size-5 text-emerald-400" />
            Login Module
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Enter a username and password to recompute the salted, peppered
            hash.
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
                                placeholder="Enter password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {result && (
                    <div
                      className={cn(
                        "rounded-md border px-3 py-2 text-sm",
                        result === "success"
                          ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                          : "border-red-400/50 bg-red-400/10 text-red-200"
                      )}
                    >
                      {result === "success"
                        ? "Login Successful"
                        : "Invalid Username or Password"}
                    </div>
                  )}
                  <Button
                    className="w-full bg-emerald-400 text-black hover:bg-emerald-300"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm text-zinc-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="text-emerald-300 underline underline-offset-4"
                    href="/signup"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-zinc-500">
        The login check retrieves the stored salt, recomputes the hash, and
        compares it with the stored hash.
      </div>
    </div>
  );
}
