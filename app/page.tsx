import { Database, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-6 py-10">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-400/10 px-3 py-1 text-emerald-300 text-sm">
            <ShieldCheck className="size-4" />
            Cybersecurity Final Project
          </div>
          <h1 className="font-semibold text-4xl text-white tracking-normal md:text-6xl">
            Secure Registration and Login System
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-400 leading-8">
            A focused authentication demo that validates password strength,
            creates a unique salt, combines password, salt, and pepper, then
            stores only the username, password hash, and salt.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-emerald-500/20 bg-zinc-950 p-4">
            <KeyRound className="mb-3 size-5 text-emerald-400" />
            <h2 className="font-medium text-white">Hashing</h2>
            <p className="mt-2 text-sm text-zinc-500">
              PBKDF2-SHA256 protects passwords before database storage.
            </p>
          </div>
          <div className="rounded-md border border-emerald-500/20 bg-zinc-950 p-4">
            <Database className="mb-3 size-5 text-emerald-400" />
            <h2 className="font-medium text-white">Salt</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Every registration creates a unique random salt.
            </p>
          </div>
          <div className="rounded-md border border-emerald-500/20 bg-zinc-950 p-4">
            <LockKeyhole className="mb-3 size-5 text-emerald-400" />
            <h2 className="font-medium text-white">Pepper</h2>
            <p className="mt-2 text-sm text-zinc-500">
              The secret pepper stays in environment variables, not the table.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/login">
            <Button variant="outline">Login Module</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-emerald-400 text-black hover:bg-emerald-300">
              Registration Module
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
