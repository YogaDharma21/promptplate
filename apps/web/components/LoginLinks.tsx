"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { Button } from "./ui/button";

const LoginLinks = () => {
    const { user } = useAuth({ middleware: "guest" });

    return (
        <div className="flex gap-4 items-center justify-center">
            {user ? (
                <Link href="/dashboard">
                    <Button className="transition-colors font-bold px-6">
                        Dashboard
                    </Button>
                </Link>
            ) : (
                <>
                    <Link href="/login">
                        <Button className="transition-colors border-primary font-bold px-6">
                            Login
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button
                            className="transition-colors font-bold px-6"
                            variant={"secondary"}
                        >
                            Get Started for Free
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default LoginLinks;
