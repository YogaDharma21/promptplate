"use client";

import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/hooks/auth";

export default function LoginPage() {
    return (
        <>
            <LoginForm />
        </>
    );
}
