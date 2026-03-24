"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginLinks from "@/components/LoginLinks";

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
            <main className="text-center flex flex-col gap-5">
                <h1 className="bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                    Prompt Plate.
                </h1>

                <p className="mx-auto max-w-md text-xl text-neutral-400 md:text-2xl">
                    Share prompts, spark ideas.
                </p>
                <LoginLinks />
                <footer className="text-sm text-neutral-500">
                    © {new Date().getFullYear()} Prompt Plate. All rights
                    reserved.
                </footer>
            </main>
        </div>
    );
}
