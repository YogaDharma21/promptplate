"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium cursor-pointer"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Prompt Plate
                </Link>
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
