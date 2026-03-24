"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <>
            <RegisterForm />
        </>
    );
}
