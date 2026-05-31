import {
  CheckCircle2,
  Database,
  Home,
  KeyRound,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-zinc-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-emerald-500/20 border-b pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-400/10 px-3 py-1 text-emerald-300 text-sm">
              <ShieldCheck className="size-4" />
              Authenticated Demo Area
            </div>
            <h1 className="font-semibold text-3xl text-white">
              Login Successful
            </h1>
            <p className="mt-2 text-zinc-400">
              This placeholder dashboard confirms the login module accepted the
              username and password.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="size-4" />
                Home
              </Link>
            </Button>
            <Button
              asChild
              className="bg-emerald-400 text-black hover:bg-emerald-300"
            >
              <Link href="/">
                <LogOut className="size-4" />
                Logout
              </Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-emerald-500/20 bg-zinc-950 p-5">
            <CheckCircle2 className="mb-4 size-6 text-emerald-400" />
            <h2 className="font-medium text-white">Credential Verified</h2>
            <p className="mt-2 text-sm text-zinc-500">
              The password was checked by recomputing the stored salted hash.
            </p>
          </div>
          <div className="rounded-md border border-emerald-500/20 bg-zinc-950 p-5">
            <KeyRound className="mb-4 size-6 text-emerald-400" />
            <h2 className="font-medium text-white">Pepper Protected</h2>
            <p className="mt-2 text-sm text-zinc-500">
              The pepper remains in the environment and never appears in Neon.
            </p>
          </div>
          <div className="rounded-md border border-emerald-500/20 bg-zinc-950 p-5">
            <Database className="mb-4 size-6 text-emerald-400" />
            <h2 className="font-medium text-white">Database Evidence</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Screenshot the `secure_user` table for username, hash, and salt.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
